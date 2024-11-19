import { useNavigate } from 'react-router-dom';
import '../HeroSection/HeroSection.css';
function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section-container">
      <p id="hero-title">
        Metro Vancouver <br />
        Emergency Reporting System
      </p>
      <p id="hero-subtitle">
        The Metro Vancouver 9-1-1 Reporting System lets you report and track emergencies online,
        helping first responders reach those in need faster.
      </p>
      <div id="button-container">
        <button id="submit-button" onClick={() => navigate('/file-a-report')}>Submit a Report</button>
        <button id="view-button" onClick={() => navigate('/view-all-reports')}>
          View All Reports
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
