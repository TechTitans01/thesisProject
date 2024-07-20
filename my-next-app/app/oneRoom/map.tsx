import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

interface MapProps {
  location: string;
  hotelId: number;
}

const Map: React.FC<MapProps> = ({ location, hotelId }) => {
  const [data, setData] = useState<any>(null);
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    console.log(hotelId)
    axios.get(`http://localhost:8080/api/hotels/getoneById/${hotelId}`)
      .then((res) => {
        console.log("res.data ==>", res.data);
        setData(res.data);
        setPosition([res.data.latitude, res.data.longitude]);
      })
      .catch(err => {
        console.log(err);
      });
  }, [hotelId]);

  const mapStyle = { height: '300px', width: '100%' };

  return (
    <div>
      {data ? (
        <MapContainer center={position} zoom={13} style={mapStyle}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={defaultIcon}>
            <Popup>
              {location} <br /> A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Map;
