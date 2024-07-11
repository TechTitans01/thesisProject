"use client";
import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface Notification {
  content: string;
  userId: number;
}

const socket: Socket = io('http://localhost:8080');

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get<Notification[]>('http://localhost:8080/notifications');
      setNotifications(response.data);
    };

    fetchNotifications();

    socket.on('notification', (notification: Notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      setUnreadCount((prevCount) => prevCount + 1); 
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  const handleBellClick = () => {
    setShowDropdown(!showDropdown);
    setUnreadCount(0); 
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleBellClick}>
        <Badge badgeContent={unreadCount} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {showDropdown && (
        <div className="notifications-dropdown">
          <h2>Notifications</h2>
          <ul>
            {notifications.map((notif) => (
              <li key={notif.id}>{notif.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
