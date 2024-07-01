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
import { Delete, Add, Room } from '@mui/icons-material';
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

interface Room {
  id: number;
  description: string;
  guests: number;
  nightPrice: number;
  bedroom: number;
  baths: number;
  beds: number;
  status: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
}

const Hotels: FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [currentHotelId, setCurrentHotelId] = useState<number | null>(null);
  const [newHotel, setNewHotel] = useState({
    name: '',
    image: '',
    bookings: 0,
    stars: 0,
    latitude: 0,
    longitude: 0
  });
  const [newRoom, setNewRoom] = useState({
    description: '',
    guests: 0,
    nightPrice: 0,
    bedroom: 0,
    baths: 0,
    beds: 0,
    status: 1,
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: ''
  });

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

  const fetchRooms = (hotelId: number) => {
    setCurrentHotelId(hotelId);
    axios.get(`http://localhost:8080/rooms/hotel/${hotelId}`)
      .then(response => {
        setRooms(response.data);
        setRoomDialogOpen(true);
      })
      .catch(error => {
        console.error("There was an error fetching the rooms!", error);
      });
  };

  const handleDeleteHotel = (id: number) => {
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

  const handleAddHotel = () => {
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

  const handleAddRoom = () => {
    if (currentHotelId === null) return;
    
    axios.post(`http://localhost:8080/rooms/hotel/${currentHotelId}`, newRoom)
      .then(() => {
        setSnackbarMessage('Room added successfully');
        setSnackbarOpen(true);
        // Fetch updated rooms for the current hotel
        axios.get(`http://localhost:8080/rooms/hotel/${currentHotelId}`)
          .then(response => {
            setRooms(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the rooms!", error);
          });
        setRoomDialogOpen(false);
        setNewRoom({
          description: '',
          guests: 0,
          nightPrice: 0,
          bedroom: 0,
          baths: 0,
          beds: 0,
          status: 1,
          image1: '',
          image2: '',
          image3: '',
          image4: '',
          image5: ''
        });
      })
      .catch(error => {
        console.error("There was an error adding the room!", error);
        setSnackbarMessage('Failed to add room');
        setSnackbarOpen(true);
      });
  };
  

  const handleDeleteRoom = (roomId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this room?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/rooms/${roomId}`)
          .then(() => {
            setSnackbarMessage('Room deleted successfully');
            setSnackbarOpen(true);
            if (currentHotelId !== null) {
              fetchRooms(currentHotelId);
            }
          })
          .catch(error => {
            console.error("There was an error deleting the room!", error);
            setSnackbarMessage('Failed to delete room');
            setSnackbarOpen(true);
          });
      }
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

  const handleOpenRoomDialog = () => {
    setRoomDialogOpen(true);
  };

  const handleCloseRoomDialog = () => {
    setRoomDialogOpen(false);
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
                    <IconButton edge="end" color="primary" onClick={() => fetchRooms(hotel.id)}>
                      <Room />
                    </IconButton>
                    <IconButton edge="end" color="secondary" onClick={() => handleDeleteHotel(hotel.id)}>
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
        <DialogTitle>Add a New Hotel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a new hotel.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={newHotel.name}
            onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
            value={newHotel.image}
            onChange={(e) => setNewHotel({ ...newHotel, image: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Bookings"
            type="number"
            fullWidth
            variant="standard"
            value={newHotel.bookings}
            onChange={(e) => setNewHotel({ ...newHotel, bookings: +e.target.value })}
          />
          <TextField
            margin="dense"
            label="Stars"
            type="number"
            fullWidth
            variant="standard"
            value={newHotel.stars}
            onChange={(e) => setNewHotel({ ...newHotel, stars: +e.target.value })}
          />
          <TextField
            margin="dense"
            label="Latitude"
            type="number"
            fullWidth
            variant="standard"
            value={newHotel.latitude}
            onChange={(e) => setNewHotel({ ...newHotel, latitude: +e.target.value })}
          />
          <TextField
            margin="dense"
            label="Longitude"
            type="number"
            fullWidth
            variant="standard"
            value={newHotel.longitude}
            onChange={(e) => setNewHotel({ ...newHotel, longitude: +e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddHotel}>Add Hotel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={roomDialogOpen} onClose={handleCloseRoomDialog} fullWidth maxWidth="md">
        <DialogTitle>Rooms</DialogTitle>
        <DialogContent>
          <DialogContentText>
            List of rooms for the selected hotel.
          </DialogContentText>
          <List>
            {rooms.map((room) => (
              <ListItem key={room.id} divider>
                <ListItemText
                  primary={`Room ${room.id}: ${room.description}`}
                  secondary={`Guests: ${room.guests}, Night Price: ${room.nightPrice}, Status: ${room.status}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="secondary" onClick={() => handleDeleteRoom(room.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRoomDialog}>Close</Button>
          <Button onClick={handleOpenRoomDialog} color="primary">
            Add Room
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={roomDialogOpen} onClose={handleCloseRoomDialog}>
        <DialogTitle>Add a New Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a new room.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.description}
            onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Guests"
            type="number"
            fullWidth
            variant="standard"
            value={newRoom.guests}
            onChange={(e) => setNewRoom({ ...newRoom, guests: +e.target.value })}
          />
          <TextField
            margin="dense"
            label="Night Price"
            type="number"
            fullWidth
            variant="standard"
            value={newRoom.nightPrice}
            onChange={(e) => setNewRoom({ ...newRoom, nightPrice: +e.target.value })}
          />
          <TextField
            margin="dense"
            label="Bedroom"
            type="number"
            fullWidth
            variant="standard"
            value={newRoom.bedroom}
            onChange={(e) => setNewRoom({ ...newRoom, bedroom: +e.target.value })}
          />
          <TextField
            margin="dense"
            label="Baths"
            type="number"
            fullWidth
            variant="standard"
            value={newRoom.baths}
            onChange={(e) => setNewRoom({ ...newRoom, baths: +e.target.value })}
          />
          <TextField
            margin="dense"
            label="Beds"
            type="number"
            fullWidth
            variant="standard"
            value={newRoom.beds}
            onChange={(e) => setNewRoom({ ...newRoom, beds: +e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image 1"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.image1}
            onChange={(e) => setNewRoom({ ...newRoom, image1: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image 2"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.image2}
            onChange={(e) => setNewRoom({ ...newRoom, image2: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image 3"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.image3}
            onChange={(e) => setNewRoom({ ...newRoom, image3: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image 4"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.image4}
            onChange={(e) => setNewRoom({ ...newRoom, image4: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image 5"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.image5}
            onChange={(e) => setNewRoom({ ...newRoom, image5: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRoomDialog}>Cancel</Button>
          <Button onClick={handleAddRoom}>Add Room</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Hotels;
