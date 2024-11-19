import '../Navbar/Navbar.css';
import CityLogo from '../../assets/city-logo.png';
import { Link, useLocation } from 'react-router-dom'; // Import Link for internal navigation

function Navbar() {
    const location =  useLocation(); // Get the current location

    return (
        <section className="navbar-container">
            <a href="https://vancouver.ca/" target="_blank" rel="noopener noreferrer">
                <img src={CityLogo} alt="City of Vancouver" draggable="false" id="city-logo" />
            </a>
            <div className="menu-list">
                {/* Assign className="menu-link" to Links */}
                <Link to="/" className={`menu-link ${location.pathname === '/' ? 'active-link' : ''}`}>Home</Link>
                <Link to="/file-a-report" className={`menu-link ${location.pathname === '/file-a-report' ? 'active-link' : ''}`}>File a Report</Link>
                <Link to="/view-all-reports" className={`menu-link ${location.pathname === '/view-all-reports' ? 'active-link' : ''}`}>View All Reports</Link>
            </div>
        </section>
    );
}

export default Navbar;
