
const express = require('express');
const { sendNotification, getNotificationsByUser } = require('../controller/notification');

const router = express.Router();

router.post('/notifications', sendNotification);
router.get('/notifications/user/:userId', getNotificationsByUser);

module.exports = router;