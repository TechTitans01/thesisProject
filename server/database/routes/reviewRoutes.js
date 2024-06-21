const express = require('express');
const router = express.Router();
const commentaireController = require('../controller/reviewControllers');


router.get('/room/:roomId', commentaireController.getReviewsForRoom);


router.get('/user/:userId', commentaireController.getReviewsForUser);


router.post('/:roomId/:userId', commentaireController.createReview);


router.delete('/:id', commentaireController.deleteReview);

module.exports = router;
