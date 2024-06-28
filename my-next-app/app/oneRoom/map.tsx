import React from 'react';
import { Box } from '@mui/material';
<<<<<<< HEAD
interface mapProps {
  location: string;
}
const Map = ({ location }:mapProps) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(location)}`;
=======

const Map = ({ location }:any) => {
  const mapUrl= `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(location)}`;
>>>>>>> 493f5051fd2b685b85cd3e9a284410b7871db446

  return (
    <Box
      component="iframe"
      width="100%"
      height="300"
      src={mapUrl}
      frameBorder="0"
      style={{ border: 0 }}
      allowFullScreen
      aria-hidden="false"
      tabIndex="0"
    />
  );
};

export default Map;
