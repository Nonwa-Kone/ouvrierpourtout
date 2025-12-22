const express = require('express');
const {
  getAdminNotification,
  getAdminNotificationById,
} = require('../../controllers/notifications/admin');

const router = express.Router();

router.get('/admin', getAdminNotification);
router.get('/admin/:id', getAdminNotificationById);

module.exports = router;
