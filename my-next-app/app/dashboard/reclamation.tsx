import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const Reclamation: React.FC = () => {
  const [reclamations, setReclamations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReclamation, setSelectedReclamation] = useState<any | null>(null);
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchReclamations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/reclamation/getall');
      setReclamations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('There was an error fetching the reclamations!', error);
      setLoading(false);
    }
  };

  const sendMessage=(select:string)=>{
   
    axios.post("http://localhost:8080/api/reclamation/send/gmail",{
      to:select,  
      subject:"reponse Recalamtion",
      html:`<p>${message}</p>`

    }).then((res)=>{
      console.log(res)
      setSnackbarMessage(`Message sent to ${select}`);
      setSnackbarOpen(true);
    }).catch((err)=>{console.log(err)})  }


  // const sendMessage = async () => {
  //   try {
  //     if (!selectedReclamation) {
  //       return;
  //     }

  //     const { id: senderId, email: receiverId } = selectedReclamation;
  //     const payload = {
  //       senderId,
  //       receiverId,
  //       message
  //     };

  //     await axios.post(`http://localhost:8080/api/chat/messages/${senderId}/${receiverId}`, payload);

  //     setSnackbarMessage(`Message sent to ${selectedReclamation.email}`);
  //     setSnackbarOpen(true);
  //     setOpenDialog(false);
  //   } catch (error) {
  //     console.error('There was an error sending the message!', error);
  //     setSnackbarMessage('Failed to send message');
  //     setSnackbarOpen(true);
  //   }
  // };

  const handleOpenDialog = (reclamation: any) => {
    setSelectedReclamation(reclamation);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReclamation(null);
    setMessage('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchReclamations();
  }, []);

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reclamations
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reclamations.map((reclamation) => (
              <TableRow key={reclamation.id}>
                <TableCell>{reclamation.firstName}</TableCell>
                <TableCell>{reclamation.lastName}</TableCell>
                <TableCell>{reclamation.email}</TableCell>
                <TableCell>{reclamation.phoneNumber}</TableCell>
                <TableCell>{reclamation.content}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(reclamation)}
                  >
                    Send Message
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Send Message to {selectedReclamation?.email}</DialogTitle>
        <DialogContent>
          <TextField
            label="Message"
            multiline
            rows={4}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={()=>sendMessage(selectedReclamation.email)} color="primary" variant="contained">
            Send
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default Reclamation;