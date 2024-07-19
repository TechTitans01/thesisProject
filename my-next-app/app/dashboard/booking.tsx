import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Select,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import './style/booking.css';

interface Booking {
  id: number;
  start: string;
  end: string;
  guests: number;
  status: string;
  user: {
    email: string;
  };
}

const Booking: FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/bookings');
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('There was an error fetching the bookings!', error);
      setLoading(false);
    }
  };

  const sendEmail = async (email: string, subject: string, text: string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/reclamation/send/gmail', {
        to: email,
        subject,
        text,
      });
      console.log('Email sent successfully:', response.data);
    } catch (error) {
      console.error('There was an error sending the email!', error);
      throw error;
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

          console.log('Response data:', response.data);

          const bookingToUpdate = bookings.find((booking) => booking.id === bookingId);

          if (bookingToUpdate && bookingToUpdate.user.email) {
            const emailContent = `Your booking (ID: ${bookingId}) has been ${actionPast}.`;
            await sendEmail(bookingToUpdate.user.email, 'Booking Status Update', emailContent);
          } else {
            console.error('User email not found in the response data');
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
      <Card className="card" sx={{ maxWidth: 1200, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Bookings
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Booking ID</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Guests Number</TableCell>
                    <TableCell>User Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id} className={`${booking.status === 'canceled' ? 'cancelledBooking' : ''} ${booking.status === 'confirmed' ? 'confirmedBooking' : ''}`}>
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{new Date(booking.start).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(booking.end).toLocaleDateString()}</TableCell>
                      <TableCell>{booking.guests}</TableCell>
                      <TableCell>{booking.user.email}</TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Booking;
