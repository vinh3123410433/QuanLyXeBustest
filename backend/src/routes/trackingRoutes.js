const express = require('express');
const {
  updateLocation,
  getBusLocation,
  getBusTrackingHistory,
  getAllBusesLocations,
  getRouteBusesLocations
} = require('../controllers/trackingController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');
const {
  validateTracking,
  validateUUID,
  validatePagination
} = require('../middleware/validationMiddleware');

const router = express.Router();

// Update bus location (Driver only)
router.post('/location', 
  authenticateToken, 
  authorize('driver'), 
  validateTracking, 
  updateLocation
);

// Get bus current location
router.get('/bus/:id', 
  authenticateToken, 
  validateUUID, 
  getBusLocation
);

// Get bus tracking history
router.get('/bus/:id/history', 
  authenticateToken, 
  validateUUID, 
  validatePagination, 
  getBusTrackingHistory
);

// Get all buses locations
router.get('/buses', 
  authenticateToken, 
  authorize('admin', 'dispatch'), 
  getAllBusesLocations
);

// Get route buses locations
router.get('/route/:routeId/buses', 
  authenticateToken, 
  validateUUID, 
  getRouteBusesLocations
);

module.exports = router;