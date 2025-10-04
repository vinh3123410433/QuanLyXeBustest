const express = require('express');
const {
  register,
  login,
  refreshToken,
  logout,
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  validateUserRegistration,
  validateLogin,
  validateUserUpdate
} = require('../middleware/validationMiddleware');

const router = express.Router();

// Public routes
router.post('/register', validateUserRegistration, register);
router.post('/login', validateLogin, login);
router.post('/refresh', refreshToken);

// Protected routes
router.post('/logout', authenticateToken, logout);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, validateUserUpdate, updateProfile);
router.put('/change-password', authenticateToken, changePassword);

module.exports = router;