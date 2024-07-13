"use client"
import { useState } from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemText, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { useRouter } from "next/navigation";
import Booking from './booking';
import Users from './user';
import Charts from './chart';
import Destinations from './destination';
import './style/page.css';
import Reclamation from './reclamation';

const drawerWidth = 240;

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState<string>('Dashboard');
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
