import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import md5 from 'md5'; 
import 'leaflet/dist/leaflet.css';
import './MapLeaflet.css';
import ReportsList, { Report } from '../Reports/ReportsList';

const MapLeaflet: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [status, setStatus] = useState('Open'); 
  const PASSWORD_HASH = '075ce5ba743720afbc7fb084cc975fe4'; // MD5 hash of 'namga'

  const handleMoreInfoClick = (report: Report) => {
    setSelectedReport(report);
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
        center={[49.2827, -123.1207]}
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

      <ReportsList onMoreInfoClick={handleMoreInfoClick} />

      {showPanel && selectedReport && (
        <div className="side-panel">
          <div className="panel-content">
            <h2>Emergency Report Details</h2>
            <p><strong>Location:</strong> {selectedReport.location}</p>
            <p><strong>Type:</strong> {selectedReport.emergencyType}</p>
            <p><strong>Time Reported:</strong> {new Date(selectedReport.timeReported).toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedReport.status}</p>
            <p><strong>Full Name:</strong> {selectedReport.fullName}</p>
            <p><strong>Phone Number:</strong> {selectedReport.phoneNumber}</p>
            <p><strong>Description:</strong> {selectedReport.description}</p>
            {selectedReport.imageUrl && (
              <img 
                src={selectedReport.imageUrl} 
                alt="Report Evidence" 
                className="report-image"
              />
            )}
            <div className="panel-actions">
                <button className="change-button" onClick={handleChangeStatus}>
                Change Status
                </button>
                <button className="close-button" onClick={handleClosePanel}>
                Close
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapLeaflet;