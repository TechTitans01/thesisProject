const {booking,notification} = require('../sequelize/index');

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
      console.log(req.body);
      const newBooking = await booking.create(req.body.bookingDetails);
      res.status(201).json(newBooking);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },
  updateBooking: (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const updatedBooking =  booking.findByPk(id);
      if (!updatedBooking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      // Update the booking status
       updatedBooking.update({ status });

      // Send notification to user if booking is confirmed
      if (status === 'confirmed') {
        const notificationContent = `Your booking (ID: ${id}) has been confirmed.`;
        const newNotification =  notification.create({
          content: notificationContent,
          userId: updatedBooking.userId, // Assuming you have userId in your booking model
        });
      }

      res.status(200).json(updatedBooking);
    } catch (error) {
      console.error('Error updating booking status:', error);
      res.status(500).json({ error: error.message });
    }
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