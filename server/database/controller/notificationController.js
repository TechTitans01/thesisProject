const {notification} = require('../sequelize/index');

module.exports = {
  getAllNotifications: async (req, res) => {
    try {
      const notifications = await notification.findAll();
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNotificationsByUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const notifications = await notification.findAll({ where: { userId } });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNotificationById: async (req, res) => {
    const { id } = req.params;
    try {
      const notification = await notification.findByPk(id);
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createNotification: async (req, res) => {
    const { content, userId } = req.body;
    try {
      const newNotification = await notification.create({ content, userId });
      res.status(201).json(newNotification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateNotification: async (req, res) =>{
    try {
      await Notification.update(
        { isSeen: true },
        { where: { isSeen: false } }
      );
      res.status(200).send('Notifications marked as seen');
    } catch (error) {
      console.error('Error marking notifications as seen:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  deleteNotification: async (req, res) => {
    const { id } = req.params;
    try {
      const notification = await notification.findByPk(id);
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      await notification.destroy();
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
