module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
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
    routeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Routes',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.ENUM('pickup', 'dropoff'),
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME
    },
    days: {
      type: DataTypes.JSON, // Array of day numbers: [1,2,3,4,5] for Mon-Fri
      allowNull: false,
      defaultValue: [1, 2, 3, 4, 5]
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    notes: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ['busId', 'routeId', 'type', 'startTime']
      }
    ]
  });

  Schedule.associate = (models) => {
    // Schedule belongs to a bus
    Schedule.belongsTo(models.Bus, {
      foreignKey: 'busId',
      as: 'bus'
    });

    // Schedule belongs to a route
    Schedule.belongsTo(models.Route, {
      foreignKey: 'routeId',
      as: 'route'
    });
  };

  return Schedule;
};