// Test setup file
const db = require('../src/models');

beforeAll(async () => {
  // Sync database before all tests
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  // Close database connection after all tests
  await db.sequelize.close();
});

// Mock console.log to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};