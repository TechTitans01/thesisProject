import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Grid,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import './style/booking.css';
import io from 'socket.io-client';


const socket = io('http://localhost:8080');

const Booking: FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();

    const adminId = 1;

    socket.on('notification', () => {
      Swal.fire('Notification', 'info');
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/bookings');
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the bookings!", error);
      setLoading(false);
    }
  };

  const sendNotification = async (userId: number, content: string) => {
    try {
      await axios.post('http://localhost:8080/api/notifications', { userId, content });
    } catch (error) {
      console.error('There was an error sending the notification!', error);
    }
  };

  const updateBookingStatus = async (bookingId: number, status: string) => {
    const action = status === 'confirmed' ? 'confirm' : 'cancel';
    const actionPast = action === 'confirm' ? 'confirmed' : 'canceled';

    Swal.fire({
      title: `Are you sure you want to ${action} this booking?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${action} it!`,
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(`http://localhost:8080/bookings/${bookingId}/status`, { status });
          
          // Fetch the updated booking details
          const updatedBooking = response.data;

          if (status === 'confirmed') {
            // Fetch the room details
            const roomResponse = await axios.get(`http://localhost:8080/rooms/${updatedBooking.roomId}`);
            const room = roomResponse.data;

            // Calculate the total cost
            const startDate = new Date(updatedBooking.start);
            const endDate = new Date(updatedBooking.end);
            const numberOfNights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const totalCost = numberOfNights * room.nightPrice;

            // Send notification with total cost
            sendNotification(updatedBooking.userId, `Your booking (ID: ${bookingId}) has been confirmed. The total cost is ${totalCost} USD.`);
          } else {
            // Send notification for canceled booking
            sendNotification(updatedBooking.userId, `Your booking (ID: ${bookingId}) has been canceled.`);
          }

          fetchBookings();
          Swal.fire(
            `${action.charAt(0).toUpperCase() + action.slice(1)}d!`,
            `The booking has been ${actionPast}.`,
            'success'
          );
        } catch (error) {
          console.error(`There was an error ${actionPast} the booking!`, error);
          Swal.fire(
            'Error!',
            `There was an error ${actionPast} the booking.`,
            'error'
          );
        }
      }
    });
  };

  const deleteBooking = async (bookingId: number) => {
    Swal.fire({
      title: 'Are you sure you want to delete this booking?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/bookings/${bookingId}`);
          fetchBookings();
          Swal.fire(
            'Deleted!',
            'The booking has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('There was an error deleting the booking!', error);
          Swal.fire(
            'Error!',
            'There was an error deleting the booking.',
            'error'
          );
        }
      }
    });
  };

  return (
    <Box className="booking" display="flex" justifyContent="center" alignItems="center" padding={2}>
      <Card className="card" sx={{ maxWidth: 800, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Bookings
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {bookings.map((booking, index) => (
                <ListItem
                  key={index}
                  divider
                  className={`${booking.status === 'canceled' ? 'cancelledBooking' : ''} ${booking.status === 'confirmed' ? 'confirmedBooking' : ''}`}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <ListItemText
                        primary={`Booking ID: ${booking.id}`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="textPrimary">
                              Start: {new Date(booking.start).toLocaleDateString()}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="textPrimary">
                              End: {new Date(booking.end).toLocaleDateString()}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="textPrimary">
                              Guests Number: {booking.guests}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="textPrimary">
                              Status: {booking.status}
                            </Typography>
                          </>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4} display="flex" alignItems="center" justifyContent="flex-end">
                      <Select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking.id, e.target.value as string)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Select status' }}
                      >
                        <MenuItem value="confirmed" disabled={booking.status === 'confirmed'}>
                          Confirm
                        </MenuItem>
                        <MenuItem value="canceled" disabled={booking.status === 'canceled'}>
                          Cancel
                        </MenuItem>
                      </Select>
                      <IconButton color="secondary" onClick={() => deleteBooking(booking.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Booking;
