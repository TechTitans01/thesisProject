import { FC, useEffect, useState } from 'react';
import axios from 'axios';
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
  DialogTitle,
  Collapse
} from '@mui/material';
import { Delete, Add, Room, ExpandMore, ExpandLess } from '@mui/icons-material';
import './style/hotel.css';
import Swal from 'sweetalert2';


interface Destination {
  id: number;
  name: string;
  image: string;
  fame: string;
  flag: string;
}

interface Hotel {
  id: number;
  name: string;
  image: string;
  bookings: number;
  stars: number;
  latitude: number | null;
  longitude: number | null;
  destinationId: number;
  discription: string;
}

interface Room {
  id: number;
  description: string;
  guests: number;
  nightPrice: number;
  bedroom: number;
  baths: number;
  beds: number;
  status: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  hotelId: number;
}

const Destinations: FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [hotels, setHotels] = useState<{ [key: number]: Hotel[] }>({});
  const [rooms, setRooms] = useState<{ [key: number]: Room[] }>({});
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hotelDialogOpen, setHotelDialogOpen] = useState(false);
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [expandedDestination, setExpandedDestination] = useState<number | null>(null);
  const [expandedHotel, setExpandedHotel] = useState<number | null>(null);
  const [newDestination, setNewDestination] = useState({
    name: '',
    image: '',
    flag: '',
    fame: '', 
  });
  
  const [newHotel, setNewHotel] = useState({
    name: '',
    image: '',
    bookings: 0,
    stars: 0,
    latitude: null,
    longitude: null,
    destinationId: 0,
    type: '', 
    description: '', 
  });
  
  const [newRoom, setNewRoom] = useState({
    description: '',
    guests: 0,
    nightPrice: 0,
    bedroom: 0,
    baths: 0,
    beds: 0,
    status: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    hotelId: 0
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = () => {
    axios.get('http://localhost:8080/api/destination/getall')
      .then(response => {
        setDestinations(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the destinations!", error);
        setLoading(false);
      });
  };

  const fetchHotels = (destinationId: number) => {
    axios.get(`http://localhost:8080/api/hotels/getone/${destinationId}`)
      .then(response => {
        setHotels(prevHotels => ({
          ...prevHotels,
          [destinationId]: response.data
        }));
      })
      .catch(error => {
        console.error("There was an error fetching the hotels!", error);
      });
  };

  const fetchRooms = (hotelId: number) => {
    axios.get(`http://localhost:8080/rooms/hotel/${hotelId}`)
      .then(response => {
        setRooms(prevRooms => ({
          ...prevRooms,
          [hotelId]: response.data
        }));
      })
      .catch(error => {
        console.error("There was an error fetching the rooms!", error);
      });
  };

  const handleAddDestination = () => {
    axios.post('http://localhost:8080/api/destination/adddestination', newDestination)
      .then(() => {
        setSnackbarMessage('Destination added successfully');
        setSnackbarOpen(true);
        fetchDestinations(); 
        setDialogOpen(false); 
        setNewDestination({ name: '', image: '', flag: '' ,fame:''}); 
      })
      .catch(error => {
        console.error("There was an error adding the destination!", error);
        setSnackbarMessage('Failed to add destination');
        setSnackbarOpen(true);
      });
  };

  const handleAddHotel = () => {
    axios.post('http://localhost:8080/api/hotels/addHotel', newHotel)
      .then(() => {
        setSnackbarMessage('Hotel added successfully');
        setSnackbarOpen(true);
        fetchHotels(newHotel.destinationId); 
        setHotelDialogOpen(false); 
        setNewHotel({ 
          name: '',
    image: '',
    bookings: 0,
    stars: 0,
    latitude: null,
    longitude: null,
    destinationId: 0,
    type: '', 
    description: '', 
        }); 
      })
      .catch(error => {
        console.error("There was an error adding the hotel!", error);
        setSnackbarMessage('Failed to add hotel');
        setSnackbarOpen(true);
      });
  };

  const handleAddRoom = () => {
    axios.post(`http://localhost:8080/rooms/hotel/${newRoom.hotelId}`, newRoom)
      .then(() => {
        setSnackbarMessage('Room added successfully');
        setSnackbarOpen(true);
        fetchRooms(newRoom.hotelId); 
        setRoomDialogOpen(false); 
        setNewRoom({
          description: '',
          guests: 0,
          nightPrice: 0,
          bedroom: 0,
          baths: 0,
          beds: 0,
          status: '',
          image1: '',
          image2: '',
          image3: '',
          image4: '',
          image5: '',
          hotelId: 0
        }); 
      })
      .catch(error => {
        console.error("There was an error adding the room!", error);
        setSnackbarMessage('Failed to add room');
        setSnackbarOpen(true);
      });
  };
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post<string>('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to upload image');
    }
  };

  const handleDeleteHotel = (hotelId: number, destinationId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this hotel!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/hotels/deleteHotel/${hotelId}`)
          .then(() => {
            setSnackbarMessage('Hotel removed successfully');
            setSnackbarOpen(true);
            fetchHotels(destinationId);
          })
          .catch(error => {
            console.error("There was an error removing the hotel!", error);
            setSnackbarMessage('Failed to remove hotel');
            setSnackbarOpen(true);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'The hotel is safe :)',
          'error'
        );
      }
    });
  };
  
  const handleDeleteRoom = (roomId: number, hotelId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this room!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/rooms/${roomId}`)
          .then(() => {
            setSnackbarMessage('Room removed successfully');
            setSnackbarOpen(true);
            fetchRooms(hotelId);
          })
          .catch(error => {
            console.error("There was an error removing the room!", error);
            setSnackbarMessage('Failed to remove room');
            setSnackbarOpen(true);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'The room is safe :)',
          'error'
        );
      }
    });
  };
  
  const handleToggleExpandDestination = (destinationId: number) => {
    if (expandedDestination === destinationId) {
      setExpandedDestination(null);
    } else {
      setExpandedDestination(destinationId);
      fetchHotels(destinationId);
    }
  };

  const handleToggleExpandHotel = (hotelId: number) => {
    if (expandedHotel === hotelId) {
      setExpandedHotel(null);
    } else {
      setExpandedHotel(hotelId);
      fetchRooms(hotelId);
    }
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

  const handleOpenHotelDialog = (destination: Destination) => {
    setSelectedDestination(destination);
    setNewHotel(prevHotel => ({ ...prevHotel, destinationId: destination.id }));
    setHotelDialogOpen(true);
  };

  const handleCloseHotelDialog = () => {
    setHotelDialogOpen(false);
  };

  const handleOpenRoomDialog = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setNewRoom(prevRoom => ({ ...prevRoom, hotelId: hotel.id }));
    setRoomDialogOpen(true);
  };

  const handleCloseRoomDialog = () => {
    setRoomDialogOpen(false);
  };

  return (
    <Box className="hotels" display="flex" flexDirection="column" alignItems="center" padding={2}>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenDialog}>
        Add Destination
      </Button>
      <Card className="card" sx={{ maxWidth: 600, width: '100%', marginTop: 2 }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Destinations
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {destinations.map((destination) => (
                <Box key={destination.id}>
                  <ListItem divider>
                    <ListItemAvatar>
                      <Avatar src={destination.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={destination.name}
                      secondary={`Flag: ${destination.flag}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" color="primary" onClick={() => handleToggleExpandDestination(destination.id)}>
                        {expandedDestination === destination.id ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Collapse in={expandedDestination === destination.id} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {hotels[destination.id]?.map((hotel) => (
                        <Box key={hotel.id} pl={4}>
                          <ListItem divider>
                            <ListItemAvatar>
                              <Avatar src={hotel.image} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={hotel.name}
                              secondary={`Bookings: ${hotel.bookings}, Stars: ${hotel.stars}`}
                            />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" color="primary" onClick={() => handleOpenRoomDialog(hotel)}>
                                <Add />
                              </IconButton>
                              <IconButton edge="end" color="secondary" onClick={() => handleDeleteHotel(hotel.id, destination.id)}>
                                <Delete />
                              </IconButton>
                              <IconButton edge="end" color="primary" onClick={() => handleToggleExpandHotel(hotel.id)}>
                                {expandedHotel === hotel.id ? <ExpandLess /> : <ExpandMore />}
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Collapse in={expandedHotel === hotel.id} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {rooms[hotel.id]?.map((room) => (
                                <Box key={room.id} pl={8}>
                                  <ListItem divider>
                                    <ListItemText
                                      
                                      secondary={` Price: ${room.nightPrice}`}
                                    />
                                    <ListItemSecondaryAction>
                                      <IconButton edge="end" color="secondary" onClick={() => handleDeleteRoom(room.id, hotel.id)}>
                                        <Delete />
                                      </IconButton>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                </Box>
                              ))}
                            </List>
                          </Collapse>
                        </Box>
                      ))}
                      <Box pl={4} mt={2}>
                        <Button variant="outlined" color="primary" onClick={() => handleOpenHotelDialog(destination)}>
                          Add Hotel
                        </Button>
                      </Box>
                    </List>
                  </Collapse>
                </Box>
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
  <DialogTitle>Add a New Destination</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Please fill out the form below to add a new destination.
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      label="Name"
      type="text"
      fullWidth
      variant="standard"
      value={newDestination.name}
      onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
    />
    <TextField
      margin="dense"
      label="Image URL"
      type="text"
      fullWidth
      variant="standard"
      value={newDestination.image}
      onChange={(e) => setNewDestination({ ...newDestination, image: e.target.value })}
    />
    <TextField
      margin="dense"
      label="Flag URL"
      type="text"
      fullWidth
      variant="standard"
      value={newDestination.flag}
      onChange={(e) => setNewDestination({ ...newDestination, flag: e.target.value })}
    />
    <TextField
      margin="dense"
      label="Fame"
      type="text"
      fullWidth
      variant="standard"
      value={newDestination.fame}
      onChange={(e) => setNewDestination({ ...newDestination, fame: e.target.value })}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog}>Cancel</Button>
    <Button onClick={handleAddDestination}>Add Destination</Button>
  </DialogActions>
</Dialog>

      <Dialog open={hotelDialogOpen} onClose={handleCloseHotelDialog}>
        <DialogTitle>Add a New Hotel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a new hotel to {selectedDestination?.name}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Hotel Name"
            type="text"
            fullWidth
            variant="standard"
            value={newHotel.name}
            onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Hotel Image URL"
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
            onChange={(e) => setNewHotel({ ...newHotel, bookings: parseInt(e.target.value, 10) })}
          />
          <TextField
            margin="dense"
            label="Stars"
            type="number"
            fullWidth
            variant="standard"
            value={newHotel.stars}
            onChange={(e) => setNewHotel({ ...newHotel, stars: parseInt(e.target.value, 10) })}
          />
          <TextField
            margin="dense"
            label="Latitude"
            type="number"
            fullWidth
            variant="standard"
            value={newHotel.latitude !== null ? newHotel.latitude : ''}
            onChange={(e) => setNewHotel({ ...newHotel, latitude: e.target.value ? parseFloat(e.target.value) : null })}
          />
          <TextField
            margin="dense"
            label="Longitude"
            type="number"
            fullWidth
            variant="standard"
            value={newHotel.longitude !== null ? newHotel.longitude : ''}
            onChange={(e) => setNewHotel({ ...newHotel, longitude: e.target.value ? parseFloat(e.target.value) : null })}
          />
              <TextField
      margin="dense"
      label="Type"
      type="text"
      fullWidth
      variant="standard"
      value={newHotel.type}
      onChange={(e) => setNewHotel({ ...newHotel, type: e.target.value })}
    />
           <TextField
      margin="dense"
      label="Description"
      type="text"
      fullWidth
      variant="standard"
      value={newHotel.description}
      onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
    />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHotelDialog}>Cancel</Button>
          <Button onClick={handleAddHotel}>Add Hotel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={roomDialogOpen} onClose={handleCloseRoomDialog}>
        <DialogTitle>Add a New Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a new room to {selectedHotel?.name}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.description}
            onChange={e => setNewRoom({ ...newRoom, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Guests"
            type="number"
            fullWidth
            variant="standard"
            value={newRoom.guests}
            onChange={e => setNewRoom({ ...newRoom, guests: parseInt(e.target.value, 10) })}
          />
          <TextField
            margin="dense"
            label="Night Price"
            type="number"
            fullWidth
            variant="standard"
            value={newRoom.nightPrice}
            onChange={e => setNewRoom({ ...newRoom, nightPrice: parseInt(e.target.value, 10) })}
          />
          <TextField
            margin="dense"
            label="Bedrooms"
            type="number"
            fullWidth
            variant="standard"
            value={newRoom.bedroom}
            onChange={e => setNewRoom({ ...newRoom, bedroom: parseInt(e.target.value, 10) })}
          />
          <TextField
            margin="dense"
            label="Baths"
            type="number"
            fullWidth
            variant="standard"
            value={newRoom.baths}
            onChange={e => setNewRoom({ ...newRoom, baths: parseInt(e.target.value, 10) })}
          />
          <TextField
            margin="dense"
            label="Beds"
            type="number"
            fullWidth
            variant="standard"
            value={newRoom.beds}
            onChange={e => setNewRoom({ ...newRoom, beds: parseInt(e.target.value, 10) })}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.status}
            onChange={e => setNewRoom({ ...newRoom, status: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image 1 URL"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.image1}
            onChange={e => setNewRoom({ ...newRoom, image1: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image 2 URL"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.image2}
            onChange={e => setNewRoom({ ...newRoom, image2: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image 3 URL"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.image3}
            onChange={e => setNewRoom({ ...newRoom, image3: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image 4 URL"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.image4}
            onChange={e => setNewRoom({ ...newRoom, image4: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image 5 URL"
            type="text"
            fullWidth
            variant="standard"
            value={newRoom.image5}
            onChange={e => setNewRoom({ ...newRoom, image5: e.target.value })}
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

export default Destinations;
