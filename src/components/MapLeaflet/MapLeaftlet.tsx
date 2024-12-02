import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import md5 from 'md5'; 
import 'leaflet/dist/leaflet.css';
import './MapLeaflet.css';
import ReportsList, { Report } from '../ReportsList/ReportsList';

const UpdateMapCenter: React.FC<{ center: [number, number] }> = ({ center }) => {
    const map = useMap();
    map.setView(center); 
    return null;
};

const MapLeaflet: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const PASSWORD_HASH = '075ce5ba743720afbc7fb084cc975fe4'; // MD5 hash of 'namga'

  const handleMoreInfoClick = (report: Report) => {
    setSelectedReport(report);
    setShowPanel(true);

    if (report.coordinate) {
        const [lat, lon] = report.coordinate.split(',').map(Number);
        setLatitude(lat);
        setLongitude(lon);
    }
    setIsEditing(false);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
    setIsEditing(false);
  };

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleChangeStatus = () => {
    setShowPasswordModal(true); // Open the password modal
  };

  const handlePasswordSubmit = () => {
    const hashedPassword = md5(passwordInput);
    if (hashedPassword === PASSWORD_HASH) {
      if (selectedReport) {
        const updatedReport = {
          ...selectedReport,
          emergencyType: (document.getElementById('type-input') as HTMLInputElement)?.value || selectedReport.emergencyType,
          status: (document.getElementById('report-status') as HTMLSelectElement)?.value || selectedReport.status,
          description: (document.getElementById('description-input') as HTMLTextAreaElement)?.value || selectedReport.description,
        };

        const storedReports = JSON.parse(localStorage.getItem('emergencyReports') || '[]');
        const updatedReports = storedReports.map((report: Report) =>
          report.timeReported === selectedReport.timeReported ? updatedReport : report
        );
        localStorage.setItem('emergencyReports', JSON.stringify(updatedReports));

        alert('Changes saved successfully!');
        setIsEditing(false);
        window.location.reload();
      }
    } else {
      alert('Incorrect password!');
    }
    setShowPasswordModal(false); // Close the modal
    setPasswordInput('');
  };

  return (
    <div className="map-container">
        <div className={`map-subcontainer ${showPanel ? 'resize' : ''}`}>
            <MapContainer
                center={[latitude || 49.2827, longitude || -123.1207]} 
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {latitude && longitude && <UpdateMapCenter center={[latitude, longitude]} />}
            {latitude && longitude && (
            <Marker position={[latitude, longitude]}>
                <Popup>
                {selectedReport?.location || 'Unknown Location'}. <br />
                </Popup>
            </Marker>
            )}
        </MapContainer>
        </div>
      <ReportsList onMoreInfoClick={handleMoreInfoClick} />

      {showPanel && selectedReport && (
        <div className={`side-panel ${showPanel ? 'show' : ''}`}>
          <div className="panel-content">
            <h2>Emergency Report Details</h2>
            <p><strong>Location:</strong> {selectedReport.location}</p>
            {isEditing ? (
                <p>
                    <strong>Type:</strong>
                    <input type="text" placeholder={selectedReport.emergencyType} id='type-input' />
                </p>
            ) : (
                <p><strong>Type:</strong> {selectedReport.emergencyType}</p>
            )}
            <p><strong>Time Reported:</strong> {new Date(selectedReport.timeReported).toLocaleString()}</p>
            {isEditing ? (
                <p>
                    <strong>Status:</strong>
                    <select name="report-status" id="report-status">
                        <option value="OPEN">OPEN</option>
                        <option value="CLOSED">CLOSED</option>
                    </select>
                </p>
            ) : (
                <p><strong>Status:</strong> {selectedReport.status}</p>
            )}
            <p><strong>Full Name:</strong> {selectedReport.fullName}</p>
            <p><strong>Phone Number:</strong> {selectedReport.phoneNumber}</p>
            {isEditing ? (
                <p>
                    <strong>Description:</strong><br />
                    <textarea
                    id="description-input"
                    name="description"
                    placeholder={selectedReport.description}
                    rows={4}
                    ></textarea>     
                </p>
            ) : (
                <p><strong>Description:</strong> {selectedReport.description}</p>
            )}
            {selectedReport.imageUrl && (
              <div className='report-image-container'>
                <img 
                    src={selectedReport.imageUrl} 
                    alt="Report Evidence" 
                    className="report-image"
                    draggable={false}
                />
              </div>  
            )}
            <div className="panel-actions">
                {isEditing ? (
                    <button className="edit-button" onClick={handleChangeStatus}>
                        Confirm
                    </button> ) : (
                    <button className="edit-button" onClick={handleEditButton}>
                        Edit
                    </button>
                )}
                <button className="close-button" onClick={handleClosePanel}>
                    Close
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="password-modal">
          <div className="modal-content">
            <h2>Please Enter Your Authorization Passkey</h2>
            <input 
              type="password" 
              value={passwordInput} 
              onChange={(e) => setPasswordInput(e.target.value)} 
            />
            <div>
              <button className="blue-submit-button" onClick={handlePasswordSubmit}>
                Submit
              </button>
              <button className="close-button2" onClick={() => setShowPasswordModal(false)}>
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
