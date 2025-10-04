module.exports = (sequelize, DataTypes) => {
  const BusTracking = sequelize.define('BusTracking', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    busId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Buses',
        key: 'id'
      }
    },
    driverId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
      validate: {
        min: -90,
        max: 90
      }
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
      validate: {
        min: -180,
        max: 180
      }
    },
    speed: {
      type: DataTypes.DECIMAL(5, 2), // km/h
      validate: {
        min: 0
      }
    },
    heading: {
      type: DataTypes.DECIMAL(5, 2), // degrees
      validate: {
        min: 0,
        max: 360
      }
    },
    accuracy: {
      type: DataTypes.DECIMAL(8, 2), // meters
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM('moving', 'stopped', 'idle', 'maintenance'),
      defaultValue: 'idle'
    },
    routeId: {
      type: DataTypes.UUID,
      references: {
        model: 'Routes',
        key: 'id'
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['busId', 'timestamp']
      },
      {
        fields: ['timestamp']
      }
    ]
  });

  BusTracking.associate = (models) => {
    // Tracking record belongs to a bus
    BusTracking.belongsTo(models.Bus, {
      foreignKey: 'busId',
      as: 'bus'
    });

    // Tracking record belongs to a driver
    BusTracking.belongsTo(models.User, {
      foreignKey: 'driverId',
      as: 'driver'
    });

    // Tracking record can belong to a route
    BusTracking.belongsTo(models.Route, {
      foreignKey: 'routeId',
      as: 'route'
    });
  };

  return BusTracking;
};