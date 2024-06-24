import React from 'react';
import { Container, Grid, Box, Typography, Card, CardContent, CardMedia, Chip, Button, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const properties = [
  {
    title: 'Bordeaux Getaway',
    image: 'https://via.placeholder.com/400x200', // Replace with actual image URL
    guests: '4-6 guests',
    type: 'Entire Home',
    beds: '5 Beds',
    baths: '3 Baths',
    amenities: ['Wifi', 'Kitchen', 'Free Parking'],
    price: '$325 /night',
    reviews: '318 reviews',
    rating: 5.0
  },
  {
    title: 'Charming Waterfront Condo',
    image: 'https://via.placeholder.com/400x200', // Replace with actual image URL
    guests: '4-6 guests',
    type: 'Entire Home',
    beds: '5 Beds',
    baths: '3 Baths',
    amenities: ['Wifi', 'Kitchen', 'Free Parking'],
    price: '$200 /night',
    reviews: '318 reviews',
    rating: 5.0
  },
  {
    title: 'Historic City Center Home',
    image: 'https://via.placeholder.com/400x200', // Replace with actual image URL
    guests: '4-6 guests',
    type: 'Entire Home',
    beds: '5 Beds',
    baths: '3 Baths',
    amenities: ['Wifi', 'Kitchen', 'Free Parking'],
    price: '$125 /night',
    reviews: '318 reviews',
    rating: 5.0
  }
];

const Page: React.FC = () => {
  return (
    <Container>
      <Box my={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4">Rooms List</Typography>
          </Grid>
          <Grid item xs={12} md={4} display="flex" justifyContent="flex-end">
            <Button variant="outlined">Free cancellation</Button>
            <Button variant="outlined">Type of place</Button>
            <Button variant="outlined">Price</Button>
            <Button variant="outlined">Instant Book</Button>
            <Button variant="outlined">More filters</Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {properties.map((property, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <Grid container>
                <Grid item xs={12} md={4}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={property.image}
                    alt={property.title}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography variant="h6">{property.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {property.guests} • {property.type} • {property.beds} • {property.baths}
                        </Typography>
                        <Box mt={2}>
                          {property.amenities.map((amenity, index) => (
                            <Chip key={index} label={amenity} size="small" />
                          ))}
                        </Box>
                        <Typography variant="body2" color="textSecondary" mt={2}>
                          ⭐ {property.rating} • {property.reviews}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} display="flex" justifyContent="flex-end">
                        <IconButton>
                          <FavoriteBorderIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <Typography variant="h6" color="primary">
                        {property.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Page;
