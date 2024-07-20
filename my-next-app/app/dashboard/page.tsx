"use client"
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {  Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemText, Typography, AppBar, Toolbar, IconButton ,Badge} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { useRouter } from "next/navigation";
import Booking from './booking';
import Users from './user';
import Charts from './chart';
import Destinations from './destination';
import Reclamation from './reclamation';
import './style/page.css';

const drawerWidth = 240;
const socket = io('http://localhost:8080'); 

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState<string>('Dashboard');
  const [notifications, setNotifications] = useState<any[]>([]); 
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    
    socket.on('connection', () => {
      console.log('Connected to server'); 
    });
    
    
    socket.on('newNotification', (notification: any) => {
      console.log('socket New Notification:', notification);
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      setUnreadCount((prevCount) => prevCount + 1);
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, [socket]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get<any[]>('http://localhost:8080/notifications');
      setNotifications(response.data); 
      setUnreadCount(response.data.filter(notification => !notification.isSeen).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleBellClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notificationId: number) => {
    console.log(`Clicked on notification with ID ${notificationId}`);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, isSeen: true } : notification
      )
    );
    setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
    handleClose();
  };
  
  const router = useRouter(); 

  const renderSection = () => {
    switch (selectedSection) {
      case 'Booking':
        return <Booking />;
      case 'Users':
        return <Users />;
      case 'Destinations':
        return <Destinations />;
      case 'Reclamation':
      case 'Reclamation':
        return <Reclamation />;
      default:
        return (
          <Typography variant="h4" sx={{ textAlign: 'center', mt: 4 }}>
            Welcome to the Dashboard!
          </Typography>
        );
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    router.push("/auth");
  };

  return (
    <div>
      <Charts />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleBellClick} sx={{ ml: 'auto' }}>
              <Badge badgeContent={unreadCount} color="error">
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
                <MenuItem key={notification.id} onClick={() => handleNotificationClick(notification.id)}>
                  <ListItemText primary={notification.content} />
                </MenuItem>
              ))}
            </Menu>
            <IconButton color="inherit" onClick={logOut}>
              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {['Dashboard', 'Booking', 'Users', 'Destinations', 'Reclamation'].map((text) => (
                <ListItem
                  button
                  key={text}
                  selected={selectedSection === text}
                  onClick={() => setSelectedSection(text)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'lightblue',
                    },
                  }}
                >
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          {renderSection()}
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;