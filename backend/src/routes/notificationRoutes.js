const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateUUID } = require('../middleware/validationMiddleware');

const router = express.Router();

// Placeholder routes - implement controllers later
router.get('/', authenticateToken, (req, res) => {
  res.json({ success: true, message: 'Notifications endpoint', data: [] });
});

router.get('/:id', authenticateToken, validateUUID, (req, res) => {
  res.json({ success: true, message: 'Get notification endpoint' });
});

router.put('/:id/read', authenticateToken, validateUUID, (req, res) => {
  res.json({ success: true, message: 'Mark notification as read endpoint' });
});

router.delete('/:id', authenticateToken, validateUUID, (req, res) => {
  res.json({ success: true, message: 'Delete notification endpoint' });
});

module.exports = router;