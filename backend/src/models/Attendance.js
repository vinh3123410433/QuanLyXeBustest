module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Students',
        key: 'id'
      }
    },
    busId: {
      type: DataTypes.UUID,
      references: {
        model: 'Buses',
        key: 'id'
      }
    },
    stopId: {
      type: DataTypes.UUID,
      references: {
        model: 'Stops',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('pickup', 'dropoff'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('present', 'absent', 'late'),
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    notes: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['studentId', 'date', 'type']
      },
      {
        fields: ['date', 'busId']
      }
    ]
  });

  Attendance.associate = (models) => {
    // Attendance belongs to a student
    Attendance.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student'
    });

    // Attendance belongs to a bus
    Attendance.belongsTo(models.Bus, {
      foreignKey: 'busId',
      as: 'bus'
    });

    // Attendance belongs to a stop
    Attendance.belongsTo(models.Stop, {
      foreignKey: 'stopId',
      as: 'stop'
    });
  };

  return Attendance;
};