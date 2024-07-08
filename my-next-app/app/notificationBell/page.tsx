"use client";
import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import axios from 'axios';
import { Badge, IconButton, Menu, MenuItem, ListItemText } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "@/app/context/authcontex/Authcontex";

const socket = io('http://localhost:8080');

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unseenCount, setUnseenCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAuth();

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/notifications/${user.id}`);
      const data = response.data;
      setNotifications(data);
      const unseenCount = data.filter((notif: any) => !notif.isSeen).length;
      setUnseenCount(unseenCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    socket.on('notification', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnseenCount((prev) => prev + 1);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  const handleBellClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = async () => {
    setAnchorEl(null);

    try {
      await axios.put('http://localhost:8080/api/notifications/mark-as-seen');
      setNotifications((prev) => prev.map((notif) => ({ ...notif, isSeen: true })));
      setUnseenCount(0);
    } catch (error) {
      console.error('Error marking notifications as seen:', error);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleBellClick}>
        <Badge badgeContent={unseenCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {notifications.slice(0, 5).map((notification, index) => (
          <MenuItem key={index} onClick={handleMenuClose}>
            <ListItemText primary={notification.content} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NotificationBell;
