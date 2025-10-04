module.exports = (sequelize, DataTypes) => {
  const Stop = sequelize.define('Stop', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
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
    type: {
      type: DataTypes.ENUM('pickup', 'dropoff', 'both'),
      defaultValue: 'both'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    landmarks: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: true,
    paranoid: true
  });

  Stop.associate = (models) => {
    // Stop belongs to many routes through RouteStop
    Stop.belongsToMany(models.Route, {
      through: models.RouteStop,
      foreignKey: 'stopId',
      as: 'routes'
    });

    // Stop has many students
    Stop.hasMany(models.Student, {
      foreignKey: 'pickupStopId',
      as: 'pickupStudents'
    });

    Stop.hasMany(models.Student, {
      foreignKey: 'dropoffStopId',
      as: 'dropoffStudents'
    });
  };

  return Stop;
};