const express = require('express');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');
const { validateBus, validateUUID } = require('../middleware/validationMiddleware');

const router = express.Router();

// Placeholder routes - implement controllers later
router.get('/', authenticateToken, (req, res) => {
  res.json({ success: true, message: 'Buses endpoint', data: [] });
});

router.post('/', authenticateToken, authorize('admin', 'dispatch'), validateBus, (req, res) => {
  res.json({ success: true, message: 'Create bus endpoint' });
});

router.get('/:id', authenticateToken, validateUUID, (req, res) => {
  res.json({ success: true, message: 'Get bus endpoint' });
});

router.put('/:id', authenticateToken, authorize('admin', 'dispatch'), validateUUID, (req, res) => {
  res.json({ success: true, message: 'Update bus endpoint' });
});

router.delete('/:id', authenticateToken, authorize('admin'), validateUUID, (req, res) => {
  res.json({ success: true, message: 'Delete bus endpoint' });
});

module.exports = router;