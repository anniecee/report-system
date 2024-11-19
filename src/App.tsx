import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection/HeroSection";
import MapLeaflet from "./components/MapLeaflet/MapLeaftlet";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HeroSection />} /> 
        {/* Map Page */}
        <Route path="/view-all-reports" element={<MapLeaflet />} />{" "}
        {/* Report Page */}
        <Route path="/file-a-report" element={<Form />} /> {/* Form Page */}
      </Routes>
    </Router>
  );
}

export default App;
