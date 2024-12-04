import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Tooltip } from 'react-leaflet';
import md5 from 'md5'; 
import 'leaflet/dist/leaflet.css';
import './MapLeaflet.css';
import ReportsList, { Report } from '../ReportsList/ReportsList';
import L from 'leaflet';
import customURL from '../../assets/marker-icon.png';

const customMarker = new L.Icon({
    iconUrl: customURL,
    iconSize: [38, 38],
});

const MoveToCurrentLocation: React.FC<{ location: [number, number] | null }> = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView(location, 13); // Move to the current location with a zoom level of 13
    }
  }, [location, map]);

  return null;
};

const MapEventsHandler: React.FC<{ onBoundsChange: (bounds: any) => void }> = ({ onBoundsChange }) => {
  const map = useMap();
  
  useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      onBoundsChange(bounds);
    },
    zoomend: () => {
      const bounds = map.getBounds();
      onBoundsChange(bounds);
    }
  });
  
  return null;
};

const MapLeaflet: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteAction, setIsDeleteAction] = useState(false); // Track delete action
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const PASSWORD_HASH = '075ce5ba743720afbc7fb084cc975fe4';
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({}); // Store marker references

  useEffect(() => {
    // Fetch all reports from local storage or API
    const existingReports = JSON.parse(localStorage.getItem('emergencyReports') || '[]');
    setReports(existingReports);
  }, []);

  const handleBoundsChange = (bounds: any) => {
    if (!reports.length) return;
    
    const filtered = reports.filter(report => {
      if (!report.coordinate) return false;
      
      const [lat, lon] = report.coordinate.split(',').map(Number);
      if (isNaN(lat) || isNaN(lon)) return false;
      
      return bounds.contains([lat, lon]);
    });
    
    setFilteredReports(filtered);
  };

  // Use Geolocation API to get the user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to access your location. Using default location.');
      }
    );
  }, []);

  const handleMoreInfoClick = (report: Report) => {
    setSelectedReport(report);
    setShowPanel(true);

    if (report.coordinate) {
      const [lat, lon] = report.coordinate.split(',').map(Number);
      setLatitude(lat);
      setLongitude(lon);
      // Open the marker's popup
      const marker = markerRefs.current[report.timeReported];
      if (marker) {
        marker.openPopup();
      }
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
      if (isDeleteAction) {
        // Perform delete logic
        if (selectedReport) {
          const updatedReports = reports.filter(
            (report) => report.timeReported !== selectedReport.timeReported
          );
  
          localStorage.setItem('emergencyReports', JSON.stringify(updatedReports));
          setReports(updatedReports);
          setFilteredReports(updatedReports);
  
          alert('Report deleted successfully!');
          setShowPanel(false); // Close side panel
        }
        setIsDeleteAction(false); // Reset delete action
      } else {
        // Perform other password-protected actions
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
        }
      }
      setShowPasswordModal(false); // Close modal
    } else {
      alert('Incorrect password!');
    }
    setPasswordInput(''); // Clear password input
  };  

  const handleDeleteRequest = () => {
    setIsDeleteAction(true); // Mark delete action
    setShowPasswordModal(true); // Open password modal
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
        <MoveToCurrentLocation location={currentLocation} />
        {currentLocation && (
          <Marker position={currentLocation} icon={customMarker}>
            <Tooltip permanent direction="top">You are here!</Tooltip>
          </Marker>
        )}
        {filteredReports.map((report, index) => (
          <Marker
            key={index}
            position={[parseFloat(report.coordinate.split(',')[0]), parseFloat(report.coordinate.split(',')[1])]}
            eventHandlers={{
              click: () => handleMoreInfoClick(report),
            }}
            ref={(el) => {
                if (el) {
                  markerRefs.current[report.timeReported] = el;
                }
            }}
            icon={customMarker}
          >
            <Popup>{report.location}</Popup>
          </Marker>
        ))}
        <MapEventsHandler onBoundsChange={handleBoundsChange} />
      </MapContainer>
    </div>
    <ReportsList onMoreInfoClick={handleMoreInfoClick} reports={filteredReports} />
     {showPanel && selectedReport && (
        <div className={`side-panel ${showPanel ? 'show' : ''}`}>
          <div className="panel-content">
            <h2>Emergency Report Details</h2>
            <p><strong>Location:</strong> {selectedReport.location}</p>
            {isEditing ? (
              <p>
                <strong>Type:</strong>
                <input type="text" placeholder={selectedReport.emergencyType} id="type-input" />
              </p>
            ) : (
              <p>
                <strong>Type:</strong> {selectedReport.emergencyType}
              </p>
            )}
            <p>
              <strong>Time Reported:</strong> {new Date(selectedReport.timeReported).toLocaleString()}
            </p>
            {isEditing ? (
              <p>
                <strong>Status:</strong>
                <select name="report-status" id="report-status" defaultValue={selectedReport.status}>
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </p>
            ) : (
              <p>
                <strong>Status:</strong> {selectedReport.status}
              </p>
            )}
            <p>
              <strong>Full Name:</strong> {selectedReport.fullName}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedReport.phoneNumber}
            </p>
            {isEditing ? (
              <p>
                <strong>Description:</strong>
                <br />
                <textarea
                  id="description-input"
                  name="description"
                  placeholder={selectedReport.description}
                  rows={4}
                ></textarea>
              </p>
            ) : (
              <p>
                <strong>Description:</strong> {selectedReport.description}
              </p>
            )}
            {selectedReport.imageUrl && (
              <div className="report-image-container">
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
                <>
                    <button className="edit-button" onClick={handleChangeStatus}>
                        Confirm
                    </button>
                    <button className="delete-button" onClick={handleDeleteRequest}>
                        Delete
                    </button>
                </>
              ) : (
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
