module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20]
      }
    },
    grade: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 10]
      }
    },
    class: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 20]
      }
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
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
    routeId: {
      type: DataTypes.UUID,
      references: {
        model: 'Routes',
        key: 'id'
      }
    },
    pickupStopId: {
      type: DataTypes.UUID,
      references: {
        model: 'Stops',
        key: 'id'
      }
    },
    dropoffStopId: {
      type: DataTypes.UUID,
      references: {
        model: 'Stops',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    emergencyContact: {
      type: DataTypes.STRING
    },
    medicalInfo: {
      type: DataTypes.TEXT
    },
    avatar: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: true,
    paranoid: true
  });

  Student.associate = (models) => {
    // Student belongs to a parent (User)
    Student.belongsTo(models.User, {
      foreignKey: 'parentId',
      as: 'parent'
    });

    // Student belongs to a bus
    Student.belongsTo(models.Bus, {
      foreignKey: 'busId',
      as: 'bus'
    });

    // Student belongs to a route
    Student.belongsTo(models.Route, {
      foreignKey: 'routeId',
      as: 'route'
    });

    // Student has pickup and dropoff stops
    Student.belongsTo(models.Stop, {
      foreignKey: 'pickupStopId',
      as: 'pickupStop'
    });

    Student.belongsTo(models.Stop, {
      foreignKey: 'dropoffStopId',
      as: 'dropoffStop'
    });

    // Student has many attendance records
    Student.hasMany(models.Attendance, {
      foreignKey: 'studentId',
      as: 'attendanceRecords'
    });
  };

  return Student;
};