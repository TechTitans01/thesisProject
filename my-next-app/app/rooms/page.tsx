import React from 'react';
import '../styles/rooms.css';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';

const RoomList = () => {
  const rooms = [
    {
      id: 1,
      description: 'Bordeaux Getaway',
      guests: 4,
      nightPrice: 325,
      bedroom: 5,
      baths: 3,
      beds: 5,
      status: 1,
      image1: '/path/to/image1.jpg',
      image2: '/path/to/image2.jpg',
      image3: '/path/to/image3.jpg',
      image4: '/path/to/image4.jpg',
      image5: '/path/to/image5.jpg',
    },
    {
      id: 2,
      description: 'Charming Waterfront Condo',
      guests: 4,
      nightPrice: 200,
      bedroom: 5,
      baths: 3,
      beds: 5,
      status: 1,
      image1: '/path/to/image2.jpg',
      image2: '/path/to/image3.jpg',
      image3: '/path/to/image4.jpg',
      image4: '/path/to/image5.jpg',
      image5: '/path/to/image1.jpg',
    },
    {
      id: 3,
      description: 'Historic City Center Home',
      guests: 4,
      nightPrice: 125,
      bedroom: 5,
      baths: 3,
      beds: 5,
      status: 1,
      image1: '/path/to/image3.jpg',
      image2: '/path/to/image4.jpg',
      image3: '/path/to/image5.jpg',
      image4: '/path/to/image1.jpg',
      image5: '/path/to/image2.jpg',
    },
  ];
  return (
    <Box>
      <div className="search-container">
        <div className="search-div">
          <div>Bordeaux</div>
          <div>Feb 19-26</div>
          <div>2 guests</div>
          <div className="search-icon">🔍</div>
        </div>
        <div className="toggle-container">
          <div className="toggle-option active">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/globe--v1.png" alt="Globe" />
          </div>
          <div className="toggle-option">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png" alt="User" />
          </div>
        </div>
      </div>
      {rooms.map(room => (
        <Card key={room.id} sx={{ display: 'flex', mb: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 200 }}
            image={room.image1}
            alt={room.description}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {room.description}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {room.guests} guests - {room.beds} beds - {room.baths} baths
              </Typography>
              <Typography variant="subtitle1" color="text.primary" component="div">
                ${room.nightPrice} / night
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <Button variant="outlined" startIcon={<FavoriteBorderIcon />}>
                Save
              </Button>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
  
export default RoomList;
