
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
  Snackbar
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import './style/user.css';

interface User {
  id: number;
  username: string;
  image: string;
}

const Users: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:8080/api/user/getall')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/user/remove/${id}`)
          .then(() => {
            setSnackbarMessage('User deleted successfully');
            setSnackbarOpen(true);
            fetchUsers(); 
          })
          .catch(error => {
            console.error("There was an error deleting the user!", error);
            setSnackbarMessage('Failed to delete user');
            setSnackbarOpen(true);
          });
      }
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box className="users" display="flex" justifyContent="center" alignItems="center" height="10vh">
      <Card className="card" sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Users
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {users.map((user) => (
                <ListItem key={user.id} divider>
                  <ListItemAvatar>
                    <Avatar src={user.image} />
                  </ListItemAvatar>
                  <ListItemText primary={user.username} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user.id)}>
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
    </Box>
  );
};

export default Users;
