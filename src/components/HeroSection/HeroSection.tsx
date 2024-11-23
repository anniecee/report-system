import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../HeroSection/HeroSection.css';
function HeroSection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the intro animation when the component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);    
  return (
    <section className={`hero-section-container ${isVisible ? 'show' : ''}`}>
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
