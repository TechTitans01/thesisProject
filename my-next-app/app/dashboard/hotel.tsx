// use client
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  Box,
  IconButton,
  ListItemSecondaryAction,
  Snackbar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import './style/hotel.css';

interface Hotel {
  id: number;
  name: string;
  image: string;
  bookings: number;
  stars: number;
  latitude?: number;
  longitude?: number;
}

const Hotels: FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: '',
    image: '',
    bookings: 0,
    stars: 0,
    latitude: 0,
    longitude: 0
  });
  const[selectedds, setSelectedds] = useState()

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = () => {
    axios.get('http://localhost:8080/api/hotels/getall')
      .then(response => {
        setHotels(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the hotels!", error);
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this hotel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/hotels/deleteHotel/${id}`)
          .then(() => {
            setSnackbarMessage('Hotel deleted successfully');
            setSnackbarOpen(true);
            fetchHotels(); 
          })
          .catch(error => {
            console.error("There was an error deleting the hotel!", error);
            setSnackbarMessage('Failed to delete hotel');
            setSnackbarOpen(true);
          });
      }
    });
  };

  const handleAdd = () => {
    axios.post('http://localhost:8080/api/hotels/addHotel', newHotel)
      .then(() => {
        setSnackbarMessage('Hotel added successfully');
        setSnackbarOpen(true);
        fetchHotels(); 
        setDialogOpen(false);
        setNewHotel({
          name: '',
          image: '',
          bookings: 0,
          stars: 0,
          latitude: 0,
          longitude: 0

        });
      })
      .catch(error => {
        console.error("There was an error adding the hotel!", error);
        setSnackbarMessage('Failed to add hotel');
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box className="hotels" display="flex" flexDirection="column" alignItems="center" padding={2}>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenDialog}>
        Add Hotel
      </Button>
      <Card className="card" sx={{ maxWidth: 600, width: '100%', marginTop: 2 }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Hotels
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {hotels.map((hotel) => (
                <ListItem key={hotel.id} divider>
                  <ListItemAvatar>
                    <Avatar src={hotel.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={hotel.name}
                    secondary={`Bookings: ${hotel.bookings}, Stars: ${hotel.stars}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(hotel.id)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Hotel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a new hotel.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newHotel.name}
            onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={newHotel.image}
            onChange={(e) => setNewHotel({ ...newHotel, image: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Bookings"
            type="number"
            fullWidth
            value={newHotel.bookings}
            onChange={(e) => setNewHotel({ ...newHotel, bookings: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Stars"
            type="number"
            fullWidth
            value={newHotel.stars}
            onChange={(e) => setNewHotel({ ...newHotel, stars: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Latitude"
            type="number"
            fullWidth
            value={newHotel.latitude}
            onChange={(e) => setNewHotel({ ...newHotel, latitude: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Longitude"
            type="number"
            fullWidth
            value={newHotel.longitude}
            onChange={(e) => setNewHotel({ ...newHotel, longitude: Number(e.target.value) })}
          />
      {/* <TextField
            margin="dense"
            label="Bookings"
            type="number"
            fullWidth
            value={newHotel.}
            onChange={(e) => setSelectedds({ selectedds, id: Number(e.target.value) })}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Hotels;
