const {commentaire} = require('../sequelize/index');

module.exports = {
  getReviewsForRoom: async (req, res) => {
    try {
      const reviews = await commentaire.findAll({ where: { roomId: req.params.roomId } });
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getReviewsForUser: async (req, res) => {
    try {
      const reviews = await commentaire.findAll({ where: { userId: req.params.userId } });
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createReview: async (req, res) => {
    try {
      const newReview = await commentaire.create({
        ...req.body,
        roomId: req.params.roomId,
        userId: req.params.userId
      });
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteReview: async (req, res) => {
    commentaire.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.sendStatus(201)
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
};
