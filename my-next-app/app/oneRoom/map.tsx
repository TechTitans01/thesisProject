import React from 'react';
import { Box } from '@mui/material';

const Map = ({ location }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(location)}`;

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
