import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';


interface WeatherData {
  description: string;
  temperature: number;
}


const Weather: React.FC<{ location: string }> = ({ location }) => {
const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = '269b3e73675fd44e25ac4b89d702c66c';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`;
        const response = await axios.get(apiUrl);

        if (response.data) {
          const { weather, main } = response.data;
          const weatherData: WeatherData = {
            description: weather[0].description,
            temperature: main.temp,
          };
          setWeather(weatherData);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://img.freepik.com/free-vector/sky-background-video-conferencing_23-2148639325.jpg)', // Replace with your own background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
        borderRadius: 1,
        color: '#black',
      }}
    >
      <Typography variant="h6">Weather in {location}</Typography>
      {weather && (
        <>
          <Typography variant="body1">{weather.description}</Typography>
          <Typography variant="body1">{weather.temperature}°C</Typography>
        </>
      )}
    </Box>
  );
};

export default Weather;
