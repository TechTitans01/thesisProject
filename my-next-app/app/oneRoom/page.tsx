import React from 'react';
import { Container, Grid, Box, Typography, Card, CardContent, CardMedia, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WifiIcon from '@mui/icons-material/Wifi';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckIcon from '@mui/icons-material/Check';


const property = {
  title: 'Bordeaux Getaway',
  location: 'Bordeaux, France',
  images: [
    'https://via.placeholder.com/800x400',
    'https://via.placeholder.com/800x400',
    'https://via.placeholder.com/800x400',
  ],
  details: {
    guests: '4-6 guests',
    type: 'Entire Home',
    beds: '5 Beds',
    baths: '3 Baths',
    amenities: ['Wifi', 'Kitchen', 'Free Parking'],
  },
  price: 325,
  rating: 5.0,
  reviews: [
    {
      user: 'John Doe',
      date: 'March 2023',
      comment: 'Great place to stay, very clean and close to everything.',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      user: 'Jane Smith',
      date: 'April 2023',
      comment: 'Lovely home with all the amenities we needed.',
      avatar: 'https://via.placeholder.com/40',
    },
  ],
};

const PropertyDetails: React.FC = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4">{property.title}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          <LocationOnIcon /> {property.location}
        </Typography>

        <Grid container spacing={2} my={2}>
          {property.images.map((image, index) => (
            <Grid item xs={12} md={4} key={index}>
              <CardMedia component="img" height="200" image={image} alt={`Image ${index + 1}`} />
            </Grid>
          ))}
        </Grid>

        <Box my={2}>
          <Typography variant="h6">Entire rental unit hosted by Super Host</Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckIcon /></ListItemIcon>
              <ListItemText primary="4-6 guests" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckIcon /></ListItemIcon>
              <ListItemText primary="5 Beds" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckIcon /></ListItemIcon>
              <ListItemText primary="3 Baths" />
            </ListItem>
          </List>
        </Box>

        <Box my={2}>
          <Typography variant="h6">What this place offers</Typography>
          <List>
            {property.details.amenities.map((amenity, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {amenity === 'Wifi' && <WifiIcon />}
                  {amenity === 'Kitchen' && <KitchenIcon />}
                  {amenity === 'Free Parking' && <LocalParkingIcon />}
                </ListItemIcon>
                <ListItemText primary={amenity} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Grid container spacing={2} my={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Where you'll sleep</Typography>
            <Card>
              <CardContent>
                <Typography>Bedroom details here...</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Weather</Typography>
          
          </Grid>
        </Grid>

        <Box my={2}>
          <Typography variant="h6">7 nights in New York</Typography>
          <CalendarTodayIcon /> {/* Add a calendar component if needed */}
        </Box>

        <Box my={2}>
          <Typography variant="h6">5.0 • 7 reviews</Typography>
          {property.reviews.map((review, index) => (
            <Box key={index} my={2}>
              <Grid container alignItems="center">
                <Grid item>
                  <Avatar src={review.avatar} />
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle2">{review.user}</Typography>
                  <Typography variant="caption" color="textSecondary">{review.date}</Typography>
                </Grid>
              </Grid>
              <Typography>{review.comment}</Typography>
              <Divider />
            </Box>
          ))}
        </Box>

        <Box my={2}>
          <Typography variant="h6">Things to know</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">House Rules</Typography>
              <Typography>Check-in: After 3:00 PM</Typography>
              <Typography>Checkout: 11:00 AM</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">Health & Safety</Typography>
              <Typography>Enhanced cleaning process</Typography>
              <Typography>Social distancing enforced</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1">Cancellation policy</Typography>
              <Typography>Free cancellation for 48 hours</Typography>
              <Typography>Partial refund before check-in</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default PropertyDetails;
