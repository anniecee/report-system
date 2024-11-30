import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import md5 from 'md5'; 
import 'leaflet/dist/leaflet.css';
import './MapLeaflet.css';
import ReportsList, { Report } from '../ReportsList/ReportsList';

// Helper Component to Update Map Center
const UpdateMapCenter: React.FC<{ center: [number, number] }> = ({ center }) => {
    const map = useMap();
    map.setView(center); // Dynamically update map center
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
  const [isEditing, setIsEditing] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const PASSWORD_HASH = '075ce5ba743720afbc7fb084cc975fe4'; // MD5 hash of 'namga'

  useEffect(() => {
    // Fetch all reports from local storage or API
    const existingReports = JSON.parse(localStorage.getItem('emergencyReports') || '[]');
    setReports(existingReports);
    setFilteredReports(existingReports); // Initialize filtered reports
  }, []);

  const handleBoundsChange = (bounds: any) => {
    if (!reports.length) return;
    
    const filtered = reports.filter(report => {
      if (!report.coordinate) return false;
      
      const [lat, lon] = report.coordinate.split(',').map(Number);
      if (isNaN(lat) || isNaN(lon)) return false;
      
      return bounds.contains([lat, lon]);
    });
    
    console.log('Filtered reports:', filtered.length); // Debug log
    setFilteredReports(filtered);
  };

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
  }

  const handleChangeStatus = () => {
    const password = prompt('Enter password to change status:');
    if (password) {
      const hashedPassword = md5(password);
      if (hashedPassword === PASSWORD_HASH) {
        if (selectedReport) {
            // Gather new values from the form
            const updatedReport = {
                ...selectedReport,
                emergencyType: (document.getElementById('type-input') as HTMLInputElement)?.value || selectedReport.emergencyType,
                status: (document.getElementById('report-status') as HTMLSelectElement)?.value || selectedReport.status,
                description: (document.getElementById('description-input') as HTMLTextAreaElement)?.value || selectedReport.description,
            };
  
            // Update localStorage
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
    }
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
        {filteredReports.map((report, index) => (
          <Marker
            key={index}
            position={[parseFloat(report.coordinate.split(',')[0]), parseFloat(report.coordinate.split(',')[1])]}
            eventHandlers={{
              click: () => handleMoreInfoClick(report),
            }}
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
    </div>
  );
};

export default MapLeaflet;