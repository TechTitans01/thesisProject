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
  DialogTitle
} from '@mui/material';
import { Delete, Add, Room } from '@mui/icons-material';
import './style/hotel.css';

interface Destination {
  id: number;
  name: string;
  image: string;
  flag: string;
}

const Destinations: FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newDestination, setNewDestination] = useState({
    name: '',
    image: '',
    flag: ''
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

  const handleDeleteDestination = (id: number) => {
    // Implement deletion logic
    // Example: axios.delete(`http://localhost:8080/api/destination/${id}`)
    // Handle success and error scenarios similarly to handleAddDestination
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
                <ListItem key={destination.id} divider>
                  <ListItemAvatar>
                    <Avatar src={destination.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={destination.name}
                    secondary={`Flag: ${destination.flag}`}
                  />
                  <ListItemSecondaryAction>
                    {/* Replace with appropriate actions */}
                    <IconButton edge="end" color="primary">
                      <Room />
                    </IconButton>
                    <IconButton edge="end" color="secondary">
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
    </Box>
  );
};

export default Destinations;
