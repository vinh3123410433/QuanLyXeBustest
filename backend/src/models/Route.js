module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
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
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 20]
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    startLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    distance: {
      type: DataTypes.DECIMAL(8, 2), // kilometers
      validate: {
        min: 0
      }
    },
    estimatedDuration: {
      type: DataTypes.INTEGER, // minutes
      validate: {
        min: 1
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    color: {
      type: DataTypes.STRING(7), // hex color code
      defaultValue: '#3B82F6'
    }
  }, {
    timestamps: true,
    paranoid: true
  });

  Route.associate = (models) => {
    // Route has many stops through RouteStop
    Route.belongsToMany(models.Stop, {
      through: models.RouteStop,
      foreignKey: 'routeId',
      as: 'stops'
    });

    // Route has many schedules
    Route.hasMany(models.Schedule, {
      foreignKey: 'routeId',
      as: 'schedules'
    });

    // Route has many students
    Route.hasMany(models.Student, {
      foreignKey: 'routeId',
      as: 'students'
    });
  };

  return Route;
};