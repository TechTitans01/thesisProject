const {booking} = require('../sequelize/index');

module.exports = {
  getAllBookings: async (req, res) => {
    try {
      const bookings = await booking.findAll();
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBookingsByUser: async (req, res) => {
    try {
      const bookings = await booking.findAll({ where: { userId: req.params.userId } });
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBookingsByRoom: async (req, res) => {
    try {
      const bookings = await booking.findAll({ where: { roomId: req.params.roomId } });
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBookingById:  (req, res) =>{
    booking.findOne({ where: { id: req.params.id } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  createBooking: async (req, res) => {
    
    try {
      const newBooking = await booking.create(req.body);
      res.status(201).json(newBooking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateBooking: (req, res) => {
    booking.findOne({ where: { id: req.params.id } })
      .then(booking => {
        if (!booking) {
          return res.status(404).json({ error: 'Booking not found' });
        }
        return booking.update(req.body)
          .then(updatedBooking => {
            res.status(200).json(updatedBooking);
          });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      })
  },
  
  deleteBooking: (req, res) => {
    booking.findOne({ where: { id: req.params.id } })
      .then(booking => {
        if (!booking) {
          return res.status(404).json({ error: 'Booking not found' });
        }
        return booking.destroy()
          .then(() => {
            res.status(204).json();
          });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      })
  },
  updateBookingStatus : async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;
  
    try {
      const bookingToUpdate = await booking.findByPk(bookingId);
  
      if (!bookingToUpdate) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      bookingToUpdate.status = status;
      await bookingToUpdate.save();
  
      res.status(200).json({ message: 'Booking status updated', booking: bookingToUpdate });
    } catch (error) {
      res.status(500).json({ message: 'Error updating booking status', error });
    }
  }
}