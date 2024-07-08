const {  Notification , user} = require('../models/notificationMode');

const sendNotification = async (req, res) => {
  const { userId, adminId, content } = req.body;
  try {
    const client = await User.findByPk(userId);
    if (!client) {
      return res.status(404).json({ error: 'User not found' });
    }

    const notification = await Notification.create({ userId, adminId, content });

    const io = req.app.get('socketio');
    if (io) {
      io.to(userId).emit('notification', notification);
    }

    res.status(201).json(notification);
  } catch (error) {
    console.error('Error sending notification:', error); 
    res.status(500).json({ error: 'Failed to send notification' });
  }
};

const getNotificationsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.findAll({ where: { userId } });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error); g
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

module.exports = { sendNotification, getNotificationsByUser };