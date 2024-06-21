const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomControllers');


router.get('/hotel/:hotelId', roomController.getAllRoomsForHotel);


router.get('/:id', roomController.getRoomById);

router.post('/hotel/:hotelId', roomController.createRoom);

router.put('/:id', roomController.updateRoom);

router.delete('/:id', roomController.deleteRoom);

module.exports = router;
