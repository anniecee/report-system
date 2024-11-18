import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's default CSS
import './MapLeaflet.css'; // Import your custom CSS

const MapLeaflet: React.FC = () => {
  return (
    <div className="map-container">
      <MapContainer
        center={[49.2827, -123.1207]} // Vancouver coordinates
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[49.2827, -123.1207]}>
          <Popup>
            Metro Vancouver <br /> Emergency Report Location.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapLeaflet;
