const db = require('../models');
const db = require('../models/')
const Room = db.room;

module.exports={
getAllRoomsForHotel:async (req, res) => {
  try {
    const rooms = await Room.findAll({ where: { hotels_Id: req.params.hotelId } });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

getRoomByIdForHotel:async (req, res) => {
  try {
    const room = await Room.findOne({
      where: { id: req.params.roomId, hotel_Id: req.params.hotelId }
    });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

createRoomForHotel:async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.hotelId);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    const newRoom = await Room.create({
      ...req.body,
      hotelId: req.params.hotelId
    });
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

updateRoomForHotel:async (req, res) => {
  try {
    const room = await Room.findOne({
      where: { id: req.params.roomId, hotelsId: req.params.hotelId }
    });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    await room.update(req.body);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

deleteRoomForHotel:async (req, res) => {
  try {
    const room = await Room.findOne({
      where: { id: req.params.roomId, hotelId: req.params.hotelId }
    });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    await room.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},
}
