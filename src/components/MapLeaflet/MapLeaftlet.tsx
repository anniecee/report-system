import React, { useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's default CSS
import './MapLeaflet.css'; // Import your custom CSS

const MapLeaflet: React.FC = () => {

  const [showPanel, setShowPanel] = useState(false); // State to control side panel visibility

  const handleMoreInfoClick = () => {
    setShowPanel(true); // Show the side panel when "MORE INFO" is clicked
  };

  const handleClosePanel = () => {
    setShowPanel(false); // Close the side panel
  };

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

      <div className="marker-table">
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Type</th>
              <th>Time Reported</th>
              <th>Status</th>
              <th>Other</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vancouver</td>
              <td>Shooting</td>
              <td>2024-11-18 (12:00PM)</td>
              <td>Open</td>
              <td>
                <button className="link-button" onClick={handleMoreInfoClick}>
                  MORE INFO
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {showPanel && (
        <div className="side-panel">
          <div className="panel-content">
            <h2>Emergency Report Details</h2>
            <p><strong>Location:</strong> Vancouver</p>
            <p><strong>Type:</strong> Shooting</p>
            <p><strong>Time Reported:</strong> 2024-11-18 (12:00 PM)</p>
            <p><strong>Status:</strong> Open</p>
            <p><strong>Description:</strong> ...</p>
            <button className="close-button" onClick={handleClosePanel}>
              Close
            </button>
            
          </div>
        </div>
      )}

    </div>
    
  );
};

export default MapLeaflet;
