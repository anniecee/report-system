import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import md5 from 'md5'; 
import 'leaflet/dist/leaflet.css'; 
import './MapLeaflet.css'; 

const MapLeaflet: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false); 
  const [status, setStatus] = useState('Open'); 
  const PASSWORD_HASH = '075ce5ba743720afbc7fb084cc975fe4'; // MD5 hash of 'namga'

  const handleMoreInfoClick = () => {
    setShowPanel(true); 
  };

  const handleClosePanel = () => {
    setShowPanel(false); 
  };

  const handleChangeStatus = () => {
    const password = prompt('Enter password to change status:');
    if (password) {
      const hashedPassword = md5(password);
      if (hashedPassword === PASSWORD_HASH) {
        setStatus((prevStatus) => (prevStatus === 'Open' ? 'Close' : 'Open'));
        alert('Status updated successfully!');
      } else {
        alert('Incorrect password!');
      }
    }
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
              <td>2024-11-18 (12:00 PM)</td>
              <td style={{ color: status === 'Open' ? 'green' : 'red' }}>
                {status}
              </td>
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
            <p>
              <strong>Status:</strong>{' '}
              <span style={{ color: status === 'Open' ? 'green' : 'red' }}>
                {status}
              </span>
            </p>
            <p><strong>Description:</strong> ...</p>
          </div>
          <div className="panel-actions">
            <button className="change-button" onClick={handleChangeStatus}>
              Change Status
            </button>
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
