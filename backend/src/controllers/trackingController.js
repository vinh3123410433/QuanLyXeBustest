const { BusTracking, Bus, User, Route } = require('../models');
const { asyncHandler } = require('../middleware/errorMiddleware');
const { calculateDistance, isValidCoordinate } = require('../utils/geoUtils');
const { getPagination, getPagingData } = require('../utils/queryHelpers');
const logger = require('../utils/logger');

// @desc    Update bus location
// @route   POST /api/tracking/location
// @access  Private (Driver)
const updateLocation = asyncHandler(async (req, res) => {
  const { busId, latitude, longitude, speed, heading, accuracy, routeId } = req.body;
  const driverId = req.user.id;

  // Validate coordinates
  if (!isValidCoordinate(latitude, longitude)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid coordinates'
    });
  }

  // Verify bus belongs to driver
  const bus = await Bus.findOne({
    where: {
      id: busId,
      driverId,
      status: 'active'
    }
  });

  if (!bus) {
    return res.status(404).json({
      success: false,
      message: 'Bus not found or you are not authorized to update this bus'
    });
  }

  // Determine bus status based on speed
  let status = 'idle';
  if (speed > 5) {
    status = 'moving';
  } else if (speed >= 0 && speed <= 5) {
    status = 'stopped';
  }

  // Create tracking record
  const trackingRecord = await BusTracking.create({
    busId,
    driverId,
    latitude,
    longitude,
    speed: speed || 0,
    heading: heading || 0,
    accuracy: accuracy || 0,
    status,
    routeId,
    timestamp: new Date()
  });

  // Update bus current location
  await bus.update({
    currentLat: latitude,
    currentLng: longitude,
    lastLocationUpdate: new Date()
  });

  // Emit real-time update via Socket.IO
  const io = req.app.get('io');
  if (io) {
    // Emit to bus-specific room
    io.to(`bus-${busId}`).emit('location-update', {
      busId,
      latitude,
      longitude,
      speed,
      heading,
      status,
      timestamp: trackingRecord.timestamp
    });

    // Emit to route-specific room if routeId provided
    if (routeId) {
      io.to(`route-${routeId}`).emit('bus-location-update', {
        busId,
        busNumber: bus.busNumber,
        latitude,
        longitude,
        speed,
        heading,
        status,
        timestamp: trackingRecord.timestamp
      });
    }
  }

  logger.info(`Location updated for bus ${bus.busNumber}: ${latitude}, ${longitude}`);

  res.json({
    success: true,
    message: 'Location updated successfully',
    data: {
      tracking: trackingRecord
    }
  });
});

// @desc    Get bus current location
// @route   GET /api/tracking/bus/:id
// @access  Private
const getBusLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const bus = await Bus.findByPk(id, {
    attributes: ['id', 'busNumber', 'currentLat', 'currentLng', 'lastLocationUpdate', 'status'],
    include: [
      {
        model: User,
        as: 'driver',
        attributes: ['id', 'firstName', 'lastName', 'phone']
      }
    ]
  });

  if (!bus) {
    return res.status(404).json({
      success: false,
      message: 'Bus not found'
    });
  }

  // Get latest tracking record
  const latestTracking = await BusTracking.findOne({
    where: { busId: id },
    order: [['timestamp', 'DESC']],
    attributes: ['latitude', 'longitude', 'speed', 'heading', 'status', 'timestamp']
  });

  res.json({
    success: true,
    data: {
      bus,
      currentLocation: latestTracking
    }
  });
});

// @desc    Get bus tracking history
// @route   GET /api/tracking/bus/:id/history
// @access  Private
const getBusTrackingHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { page = 0, size = 20, startDate, endDate } = req.query;

  const { limit, offset } = getPagination(page, size);

  let whereClause = { busId: id };

  // Add date range filter
  if (startDate || endDate) {
    whereClause.timestamp = {};
    if (startDate) {
      whereClause.timestamp[Op.gte] = new Date(startDate);
    }
    if (endDate) {
      whereClause.timestamp[Op.lte] = new Date(endDate);
    }
  }

  const data = await BusTracking.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [['timestamp', 'DESC']],
    include: [
      {
        model: Bus,
        as: 'bus',
        attributes: ['id', 'busNumber', 'licensePlate']
      },
      {
        model: User,
        as: 'driver',
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });

  const result = getPagingData(data, page, limit);

  res.json({
    success: true,
    data: result
  });
});

// @desc    Get all buses current locations
// @route   GET /api/tracking/buses
// @access  Private
const getAllBusesLocations = asyncHandler(async (req, res) => {
  const { routeId, status } = req.query;

  let whereClause = { status: 'active' };
  if (status) {
    whereClause.status = status;
  }

  let includeRoute = {};
  if (routeId) {
    includeRoute = {
      model: Route,
      as: 'schedules',
      where: { routeId },
      required: true
    };
  }

  const buses = await Bus.findAll({
    where: whereClause,
    attributes: [
      'id', 'busNumber', 'licensePlate', 'currentLat', 
      'currentLng', 'lastLocationUpdate', 'status'
    ],
    include: [
      {
        model: User,
        as: 'driver',
        attributes: ['id', 'firstName', 'lastName', 'phone']
      },
      ...(routeId ? [includeRoute] : [])
    ]
  });

  // Get latest tracking data for each bus
  const busesWithTracking = await Promise.all(
    buses.map(async (bus) => {
      const latestTracking = await BusTracking.findOne({
        where: { busId: bus.id },
        order: [['timestamp', 'DESC']],
        attributes: ['latitude', 'longitude', 'speed', 'heading', 'status', 'timestamp']
      });

      return {
        ...bus.toJSON(),
        currentTracking: latestTracking
      };
    })
  );

  res.json({
    success: true,
    data: {
      buses: busesWithTracking,
      count: busesWithTracking.length
    }
  });
});

// @desc    Get route buses locations
// @route   GET /api/tracking/route/:routeId/buses
// @access  Private
const getRouteBusesLocations = asyncHandler(async (req, res) => {
  const { routeId } = req.params;

  // Find buses assigned to this route
  const buses = await Bus.findAll({
    include: [
      {
        model: Schedule,
        as: 'schedules',
        where: { routeId },
        required: true,
        attributes: []
      },
      {
        model: User,
        as: 'driver',
        attributes: ['id', 'firstName', 'lastName', 'phone']
      }
    ],
    attributes: [
      'id', 'busNumber', 'licensePlate', 'currentLat', 
      'currentLng', 'lastLocationUpdate', 'status'
    ]
  });

  // Get latest tracking data for each bus
  const busesWithTracking = await Promise.all(
    buses.map(async (bus) => {
      const latestTracking = await BusTracking.findOne({
        where: { busId: bus.id },
        order: [['timestamp', 'DESC']],
        attributes: ['latitude', 'longitude', 'speed', 'heading', 'status', 'timestamp']
      });

      return {
        ...bus.toJSON(),
        currentTracking: latestTracking
      };
    })
  );

  res.json({
    success: true,
    data: {
      routeId,
      buses: busesWithTracking,
      count: busesWithTracking.length
    }
  });
});

module.exports = {
  updateLocation,
  getBusLocation,
  getBusTrackingHistory,
  getAllBusesLocations,
  getRouteBusesLocations
};