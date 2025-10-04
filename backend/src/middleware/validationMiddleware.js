const { body, param, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const validateUserRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .matches(/^[+]?[\d\s\-()]+$/)
    .withMessage('Please provide a valid phone number'),
  body('role')
    .optional()
    .isIn(['admin', 'dispatch', 'driver', 'parent'])
    .withMessage('Invalid role'),
  handleValidationErrors
];

const validateUserUpdate = [
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .matches(/^[+]?[\d\s\-()]+$/)
    .withMessage('Please provide a valid phone number'),
  body('role')
    .optional()
    .isIn(['admin', 'dispatch', 'driver', 'parent'])
    .withMessage('Invalid role'),
  handleValidationErrors
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Bus validation rules
const validateBus = [
  body('busNumber')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Bus number must be between 1 and 20 characters'),
  body('licensePlate')
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage('License plate must be between 5 and 15 characters'),
  body('capacity')
    .isInt({ min: 10, max: 100 })
    .withMessage('Capacity must be between 10 and 100'),
  body('model')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Model must be between 2 and 50 characters'),
  body('year')
    .optional()
    .isInt({ min: 2000, max: new Date().getFullYear() + 1 })
    .withMessage('Year must be valid'),
  body('status')
    .optional()
    .isIn(['active', 'maintenance', 'inactive'])
    .withMessage('Invalid status'),
  handleValidationErrors
];

// Route validation rules
const validateRoute = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Route name must be between 2 and 100 characters'),
  body('code')
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage('Route code must be between 2 and 20 characters'),
  body('startLocation')
    .trim()
    .notEmpty()
    .withMessage('Start location is required'),
  body('endLocation')
    .trim()
    .notEmpty()
    .withMessage('End location is required'),
  body('distance')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Distance must be a positive number'),
  body('estimatedDuration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Estimated duration must be at least 1 minute'),
  handleValidationErrors
];

// Stop validation rules
const validateStop = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Stop name must be between 2 and 100 characters'),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  body('type')
    .optional()
    .isIn(['pickup', 'dropoff', 'both'])
    .withMessage('Invalid stop type'),
  handleValidationErrors
];

// Student validation rules
const validateStudent = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('studentId')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Student ID must be between 3 and 20 characters'),
  body('parentId')
    .isUUID()
    .withMessage('Parent ID must be a valid UUID'),
  body('grade')
    .optional()
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Grade must be between 1 and 10 characters'),
  body('class')
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Class must be between 1 and 20 characters'),
  handleValidationErrors
];

// Schedule validation rules
const validateSchedule = [
  body('busId')
    .isUUID()
    .withMessage('Bus ID must be a valid UUID'),
  body('routeId')
    .isUUID()
    .withMessage('Route ID must be a valid UUID'),
  body('type')
    .isIn(['pickup', 'dropoff'])
    .withMessage('Type must be either pickup or dropoff'),
  body('startTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),
  body('days')
    .isArray({ min: 1 })
    .withMessage('Days must be an array with at least one day'),
  body('days.*')
    .isInt({ min: 1, max: 7 })
    .withMessage('Day must be between 1 and 7'),
  handleValidationErrors
];

// Tracking validation rules
const validateTracking = [
  body('busId')
    .isUUID()
    .withMessage('Bus ID must be a valid UUID'),
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  body('speed')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Speed must be a positive number'),
  body('heading')
    .optional()
    .isFloat({ min: 0, max: 360 })
    .withMessage('Heading must be between 0 and 360 degrees'),
  handleValidationErrors
];

// Common validation rules
const validateUUID = [
  param('id').isUUID().withMessage('ID must be a valid UUID'),
  handleValidationErrors
];

// Pagination validation
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserUpdate,
  validateLogin,
  validateBus,
  validateRoute,
  validateStop,
  validateStudent,
  validateSchedule,
  validateTracking,
  validateUUID,
  validatePagination
};