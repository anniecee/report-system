import '../Navbar/Navbar.css';
import CityLogo from '../../assets/city-logo.png';

function Navbar() {
    return (
        <section className="navbar-container">
            <a href="https://vancouver.ca/" target='_blank'><img src={CityLogo} alt="City of Vancouver" draggable="false" id='city-logo'/></a>
            <div className='menu-list'>
                <a href='#'>Home</a>
                <a href='#'>File a Report</a>
                <a href='#'>View All Report</a>
            </div>
        </section>
    );
}

export default Navbar;