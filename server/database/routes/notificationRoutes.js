const express = require('express');
const router = express.Router();
const {getNotificationsByUser,getAllNotifications,getNotificationById,createNotification,updateNotification} = require('../controller/notificationController');

router.get('/', getAllNotifications);
router.get('/:id', getNotificationById);
router.get('/:id', getNotificationsByUser);
router.post('/', createNotification);
router.put('/mark-as-seen', updateNotification);

module.exports = router;
