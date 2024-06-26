"use client"


import React, { useState } from 'react';
import '../styles/rooms.css';
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Rating } from '@mui/material';
import { FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';

const RoomList = () => {
  const [ratings, setRatings] = useState<any>({});

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

  const handleRatingChange = (roomId:number, newValue:any) => {
    setRatings((prevRatings:any) => ({
      ...prevRatings,
      [roomId]: newValue,
    }));
  };

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
        <Card key={room.id} sx={{ display: 'flex', mb: 4, boxShadow: 3, borderRadius: 2, height: 250 }}>
          <CardMedia
            component="img"
            sx={{ width: 280, height: 200, objectFit: 'cover', borderRadius: 4, mt: 3, ml: 2 }}
            image={"https://th.bing.com/th/id/OIP._Bg178FEGizmjHvZvMKGvgHaE8?rs=1&pid=ImgDetMain"}
            alt={room.description}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto', p: 2 }}>
            <CardContent sx={{ flex: '1 0 auto', pb: 0 }}>
              <p style={{ color: "#6c757d" }}>entire home in Bordeaux</p>
              <Typography component="div" variant="h5" sx={{ fontWeight: 'bold' }}>
                {room.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div" sx={{ fontSize: 17, mt: 4, mb: 2 }}>
                {room.guests} guests · {room.beds} beds · {room.baths} baths
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
              <Rating
                name={`rating-${room.id}`}
                value={ratings[room.id] || 0}
                onChange={(event, newValue) => {
                  handleRatingChange(room.id, newValue);
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'absolute', right: 0 }}>
                <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                  ${room.nightPrice} / night
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'absolute', right: 0 }}>
                <IconButton sx={{ mb: 45 }}>
                  <FavoriteBorderIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default RoomList;
