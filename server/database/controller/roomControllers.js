const {room} = require('../sequelize/index');
const { Op } = require('sequelize');
module.exports = {
  getAllRoomsForHotel: async (req, res) => {
    try {
      const rooms = await room.findAll({ where: { hotelId: req.params.hotelId } });
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRoomById: async (req, res) =>{
    room.findOne({ where: { id: req.params.id } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  createRoom: async (req, res) => {
    try {
      const newRoom = await room.create({
        ...req.body,
        hotelId: req.params.hotelId
      });
      res.status(201).json(newRoom);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateRoom: async (req, res) => {
    room.findOne({ where: { id: req.params.id } })
      .then(room => {
        if (!room) {
          return res.status(404).json({ error: 'Room not found' });
        }
        return room.update(req.body)
          .then(updatedRoom => {
            res.status(200).json(updatedRoom);
          });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      })
  },

  deleteRoom: async (req, res) => {
    room.findOne({ where: { id: req.params.id } })
      .then(room => {
        if (!room) {
          return res.status(404).json({ error: 'Room not found' });
        }
        return room.destroy()  
          .then(() => {
            res.status(204).json();
          });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      })
  },

  getoneroombysearch:async (req, res) => {
    try {
      const { id } = req.params;
      const { guests } = req.body
      let where = { hotelId: id }
  
      if (guests) {
        where.guests = {
          [Op.eq]: guests 
        };
      }
  
      const rooms = await room.findAll({ where });
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching rooms' });
    }
  }
}
