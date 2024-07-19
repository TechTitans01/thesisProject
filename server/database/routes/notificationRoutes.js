const express = require('express');
const router = express.Router();
const {getNotificationsByUser,getAllNotifications,getNotificationById,createNotification,deleteNotification,updateNotification,sendNotification} = require('../controller/notificationController');

router.get('/', getAllNotifications);
router.get('/:id', getNotificationById);
router.get('/:id', getNotificationsByUser);
router.post('/', createNotification);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);
router.post('/notifications', sendNotification);
router.get('user/:userId', getNotificationsByUser);
module.exports = router;
