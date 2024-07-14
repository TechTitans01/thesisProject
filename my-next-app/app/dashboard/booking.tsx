import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
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
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const Booking: FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();

    // Subscribe to 'notification' event
    socket.on('notification', () => {
      fetchBookings().then(() => {
        Swal.fire('Notification', 'info');
      });
    });

    return () => {
      socket.off('notification'); // Clean up socket subscription
    };
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    axios
      .get('http://localhost:8080/bookings')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateBookingStatus = (bookingId: number, status: string) => {
    const actionPast = status === 'confirmed' ? 'confirmed' : 'canceled';

    Swal.fire({
      title: `Are you sure you want to ${status} this booking?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${status} it!`,
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:8080/bookings/${bookingId}/status`, { status })
          .then(() => {
            fetchBookings();
            sendNotification(bookingId, status);
            Swal.fire(
              `${actionPast.charAt(0).toUpperCase() + actionPast.slice(1)}d!`,
              `The booking has been ${actionPast}.`,
              'success'
            );
          })
          .catch((error) => {
            console.error(`Error ${actionPast} booking:`, error);
            Swal.fire('Error!', `There was an error ${actionPast} the booking.`, 'error');
          });
      }
    });
  };

  const sendNotification = (bookingId: number, status: string) => {
    let notificationContent;
    if (status === 'confirmed') {
      notificationContent = `Your booking (ID: ${bookingId}) has been confirmed.`;
    } else if (status === 'canceled') {
      notificationContent = `Your booking (ID: ${bookingId}) has been canceled.`;
    }

    axios
      .post('http://localhost:8080/notifications', {
        userId: bookings.find((booking) => booking.id === bookingId)?.userId,
        content: notificationContent,
      })
      .catch((error) => {
        console.error('Error sending notification:', error);
      });
  };

  const deleteBooking = (bookingId: number) => {
    Swal.fire({
      title: 'Are you sure you want to delete this booking?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/bookings/${bookingId}`)
          .then(() => {
            fetchBookings();
            Swal.fire('Deleted!', 'The booking has been deleted.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting booking:', error);
            Swal.fire('Error!', 'There was an error deleting the booking.', 'error');
          });
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
                  className={`${booking.status === 'canceled' ? 'cancelledBooking' : ''} ${
                    booking.status === 'confirmed' ? 'confirmedBooking' : ''
                  }`}
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
