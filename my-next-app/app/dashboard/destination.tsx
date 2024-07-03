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

interface Destination {
  id: number;
  name: string;
  image: string;
  flag: string;
}

interface Hotel {
  id: number;
  name: string;
  image: string;
  bookings: number;
  stars: number;
  latitude: number ;
  longitude: number ;
  destinationId: number;
}

const Destinations: FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [hotels, setHotels] = useState<{ [key: number]: Hotel[] }>({});
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hotelDialogOpen, setHotelDialogOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [expandedDestination, setExpandedDestination] = useState<number | null>(null);
  const [newDestination, setNewDestination] = useState({
    name: '',
    image: '',
    flag: ''
  });
  const [newHotel, setNewHotel] = useState({
    name: '',
    image: '',
    bookings: 0,
    stars: 0,
    latitude: null,
    longitude: null,
    destinationId: 0
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
    axios.get(`http://localhost:8080/api/hotels/getall?destinationId=${destinationId}`)
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

  const handleAddDestination = () => {
    axios.post('http://localhost:8080/api/destination/adddestination', newDestination)
      .then(() => {
        setSnackbarMessage('Destination added successfully');
        setSnackbarOpen(true);
        fetchDestinations(); 
        setDialogOpen(false); 
        setNewDestination({ name: '', image: '', flag: '' }); 
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
          destinationId: 0 
        }); 
      })
      .catch(error => {
        console.error("There was an error adding the hotel!", error);
        setSnackbarMessage('Failed to add hotel');
        setSnackbarOpen(true);
      });
  };

  const handleDeleteHotel = (hotelId: number, destinationId: number) => {
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
  };

  const handleToggleExpand = (destinationId: number) => {
    if (expandedDestination === destinationId) {
      setExpandedDestination(null);
    } else {
      setExpandedDestination(destinationId);
      fetchHotels(destinationId);
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
                      <IconButton edge="end" color="primary" onClick={() => handleOpenHotelDialog(destination)}>
                        <Add />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleToggleExpand(destination.id)}>
                        {expandedDestination === destination.id ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Collapse in={expandedDestination === destination.id} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {hotels[destination.id] && hotels[destination.id].map((hotel) => (
                        <ListItem key={hotel.id} divider sx={{ pl: 4 }}>
                          <ListItemAvatar>
                            <Avatar src={hotel.image} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={hotel.name}
                            secondary={`Bookings: ${hotel.bookings}, Stars: ${hotel.stars}`}
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" color="secondary" onClick={() => handleDeleteHotel(hotel.id, destination.id)}>
                              <Delete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHotelDialog}>Cancel</Button>
          <Button onClick={handleAddHotel}>Add Hotel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Destinations;
