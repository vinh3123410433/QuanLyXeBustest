const express = require('express');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');
const { validateStop, validateUUID } = require('../middleware/validationMiddleware');

const router = express.Router();

// Placeholder routes - implement controllers later
router.get('/', authenticateToken, (req, res) => {
  res.json({ success: true, message: 'Stops endpoint', data: [] });
});

router.post('/', authenticateToken, authorize('admin', 'dispatch'), validateStop, (req, res) => {
  res.json({ success: true, message: 'Create stop endpoint' });
});

router.get('/:id', authenticateToken, validateUUID, (req, res) => {
  res.json({ success: true, message: 'Get stop endpoint' });
});

router.put('/:id', authenticateToken, authorize('admin', 'dispatch'), validateUUID, (req, res) => {
  res.json({ success: true, message: 'Update stop endpoint' });
});

router.delete('/:id', authenticateToken, authorize('admin'), validateUUID, (req, res) => {
  res.json({ success: true, message: 'Delete stop endpoint' });
});

module.exports = router;