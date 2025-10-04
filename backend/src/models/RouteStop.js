module.exports = (sequelize, DataTypes) => {
  const RouteStop = sequelize.define('RouteStop', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    routeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Routes',
        key: 'id'
      }
    },
    stopId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Stops',
        key: 'id'
      }
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    estimatedTime: {
      type: DataTypes.INTEGER, // minutes from route start
      validate: {
        min: 0
      }
    },
    distance: {
      type: DataTypes.DECIMAL(8, 2), // kilometers from previous stop
      validate: {
        min: 0
      }
    }
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['routeId', 'stopId']
      },
      {
        unique: true,
        fields: ['routeId', 'sequence']
      }
    ]
  });

  RouteStop.associate = (models) => {
    RouteStop.belongsTo(models.Route, {
      foreignKey: 'routeId',
      as: 'route'
    });

    RouteStop.belongsTo(models.Stop, {
      foreignKey: 'stopId',
      as: 'stop'
    });
  };

  return RouteStop;
};