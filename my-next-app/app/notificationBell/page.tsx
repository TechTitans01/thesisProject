"use client"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

const socket = io('http://localhost:8080'); 

interface Notification {
  id: number;
  content: string;
  userId: number;
  adminId: number;
  isSeen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    // Fetch initial notifications or set up socket to listen for notifications
    fetchNotifications();

    // Socket.io event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('newNotification', (notification: Notification) => {
      console.log('New Notification:', notification);
      // Optionally update state with new notification
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get<Notification[]>('http://localhost:8080/notifications'); // Adjust API endpoint
      setNotifications(response.data); // Assuming notifications are fetched in an array
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleBellClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // Optional: Mark notifications as seen or perform other actions
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleBellClick}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.id}>
            <Typography variant="body1">{notification.content}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NotificationBell;
