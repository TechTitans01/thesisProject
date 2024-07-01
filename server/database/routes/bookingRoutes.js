const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingControllers');

router.get('/', bookingController.getAllBookings);
router.get('/user/:userId', bookingController.getBookingsByUser);
router.get('/room/:roomId', bookingController.getBookingsByRoom);
router.get('/:id', bookingController.getBookingById);
router.post('/', bookingController.createBooking);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);
router.put('/:bookingId/status', bookingController.updateBookingStatus);
module.exports = router;
