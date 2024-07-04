import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  location: string;
}

const Map: React.FC<MapProps> = ({ location }) => {
  let position: [number, number] = [28.6139, 77.2090]; // Delhi coordinates as an example

  // Adjust position based on the provided location or use a default
  if (location === 'Mumbai') {
    position = [19.0760, 72.8777]; // Mumbai coordinates
  } else if (location === 'Bangalore') {
    position = [12.9716, 77.5946]; // Bangalore coordinates
  }
  // More locations can be added as needed

  return (
    <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      />
      <Marker position={position}>
        <Popup>
          {location} <br /> A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;