import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Card, CardContent, Typography, Box, Grid, Paper } from '@mui/material';


import { useAuth } from '../context/authcontex/Authcontex';



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const styles = {
  paper: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  card: {
    height: '100%',
  },
  chart: {
    height: '400px', 
  },
};

interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: string[];
  createdAt: string;
}

interface Booking {
  id: number;
  userId: number;
  hotelId: number;
  roomId: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

const Charts: React.FC = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);


const {token}=useAuth()


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      const [usersResponse, bookingsResponse] = await Promise.all([
        axios.get('http://localhost:8080/api/user/getall', config),
        axios.get('http://localhost:8080/bookings', config),
      ]);
      console.log('Users Data:', usersResponse.data);
      console.log('Bookings Data:', bookingsResponse.data);
      setUsersData(usersResponse.data);
      setBookingsData(bookingsResponse.data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const getMonthlyCounts = (data: { createdAt: string }[]) => {
    const counts = Array(12).fill(0);
    data.forEach((item) => {
      const date = new Date(item.createdAt);
      const month = date.getMonth();
      counts[month] += 1;
    });
    return counts;
  };

  const usersPerMonth = getMonthlyCounts(usersData);
  const bookingsPerMonth = getMonthlyCounts(bookingsData);
  const totalUsers = usersData.length;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const usersChartData = {
    labels: months,
    datasets: [
      {
        label: 'Users',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        data: usersPerMonth,
      },
    ],
  };

  const bookingsChartData = {
    labels: months,
    datasets: [
      {
        label: 'Bookings',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        data: bookingsPerMonth,
      },
    ],
  };

  const totalUsersChartData = {
    labels: ['Total Users'],
    datasets: [
      {
        label: 'Total Users',
        backgroundColor: ['rgba(54,162,235,0.2)'],
        borderColor: ['rgba(54,162,235,1)'],
        borderWidth: 2,
        data: [totalUsers],
      },
    ],
  };

  return (
    <Paper style={styles.paper}>
      <Box sx={{ flexGrow: 1, padding: '20px', marginTop: '10px', width: '90%', justifyContent: 'center', ml: 7 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h4" component="div" gutterBottom sx={{ textAlign: 'center' }}>
                  Monthly Users
                </Typography>
                <Box sx={styles.chart}>
                  <Bar data={usersChartData} options={{ maintainAspectRatio: false }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h4" component="div" gutterBottom sx={{ textAlign: 'center' }}>
                  Monthly Bookings
                </Typography>
                <Box sx={styles.chart}>
                  <Line data={bookingsChartData} options={{ maintainAspectRatio: false }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h4" component="div" gutterBottom sx={{ textAlign: 'center' }}>
                  Total Users
                </Typography>
                <Box sx={styles.chart}>
                  <Pie data={totalUsersChartData} options={{ maintainAspectRatio: false }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Charts;
