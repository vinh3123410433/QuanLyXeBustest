module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define('Bus', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    busNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 20]
      }
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 15]
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10,
        max: 100
      }
    },
    model: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 50]
      }
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        min: 2000,
        max: new Date().getFullYear() + 1
      }
    },
    status: {
      type: DataTypes.ENUM('active', 'maintenance', 'inactive'),
      defaultValue: 'active'
    },
    driverId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    currentLat: {
      type: DataTypes.DECIMAL(10, 8)
    },
    currentLng: {
      type: DataTypes.DECIMAL(11, 8)
    },
    lastLocationUpdate: {
      type: DataTypes.DATE
    },
    fuelLevel: {
      type: DataTypes.DECIMAL(5, 2),
      validate: {
        min: 0,
        max: 100
      }
    },
    mileage: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: true,
    paranoid: true
  });

  Bus.associate = (models) => {
    // Bus belongs to a driver (User)
    Bus.belongsTo(models.User, {
      foreignKey: 'driverId',
      as: 'driver'
    });

    // Bus can have many schedules
    Bus.hasMany(models.Schedule, {
      foreignKey: 'busId',
      as: 'schedules'
    });

    // Bus can have many tracking records
    Bus.hasMany(models.BusTracking, {
      foreignKey: 'busId',
      as: 'trackingRecords'
    });

    // Bus can have many students assigned
    Bus.hasMany(models.Student, {
      foreignKey: 'busId',
      as: 'students'
    });
  };

  return Bus;
};