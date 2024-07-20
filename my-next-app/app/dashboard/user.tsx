import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import './style/user.css';

interface User {
  id: number;
  fullname: string;
  address: string;
  phoneNumber: string;
  email: string;
  image: string;
  password: string;
  username: string;
  cardNumber: number;
  CIN: number;
  birthday: string;
  gender: string;
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
    <Box className="users" display="flex" justifyContent="center" alignItems="center" padding={2}>
      <Card className="card" sx={{ maxWidth: 1200, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Users
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
                    <TableCell>Avatar</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Card Number</TableCell>
                    <TableCell>CIN</TableCell>
                    <TableCell>Birthday</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Avatar src={user.image} />
                      </TableCell>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.fullname}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.cardNumber}</TableCell>
                      <TableCell>{user.CIN}</TableCell>
                      <TableCell>{user.birthday}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user.id)}>
                          <Delete />
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
