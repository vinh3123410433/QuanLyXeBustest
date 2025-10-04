module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200]
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('info', 'warning', 'alert', 'success'),
      defaultValue: 'info'
    },
    category: {
      type: DataTypes.ENUM('bus_arrival', 'delay', 'cancellation', 'route_change', 'general'),
      defaultValue: 'general'
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    data: {
      type: DataTypes.JSON // Additional data like busId, routeId, etc.
    },
    expiresAt: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        fields: ['userId', 'isRead']
      },
      {
        fields: ['createdAt']
      }
    ]
  });

  Notification.associate = (models) => {
    // Notification belongs to a user
    Notification.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Notification;
};