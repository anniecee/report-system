import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection/HeroSection';
import MapLeaflet from './components/MapLeaflet/MapLeaftlet';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HeroSection />} /> {/* Homepage */}
        <Route path="/view-all-reports" element={<MapLeaflet />} /> {/* Map Page */}
      </Routes>
    </Router>
  );
}

export default App;
