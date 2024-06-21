const db = require('../models/commentaireModel');
const Review = db.commentaire;

module.exports={
getReviewsForRoom:async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { roomId: req.params.roomId } });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},
createReview:async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      roomId: req.params.roomId,
      userId: req.user.id 
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

deleteReview:async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    await review.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},
}
