const express = require('express');
const router = express.Router();
const {getNotificationsByUser,getAllNotifications,getNotificationById,createNotification,deleteNotification,updateNotification} = require('../controller/notificationController');

router.get('/', getAllNotifications);
router.get('/:id', getNotificationById);
router.get('/:id', getNotificationsByUser);
router.post('/', createNotification);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);

module.exports = router;
