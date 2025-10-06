require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: '',
    database: 'quanlyxebuyt',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: console.log,
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true
    },
    timezone: '+07:00'
  },

  test: {
    username: 'root',
    password: '',
    database: 'quanlyxebuyt', // DB riêng để test
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true
    },
    timezone: '+07:00'
  },

  production: {
    username: 'root',
    password: '',
    database: 'quanlyxebuyt',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true
    },
    timezone: '+07:00',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};