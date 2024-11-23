import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection/HeroSection";
import MapLeaflet from "./components/MapLeaflet/MapLeaftlet";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";
import Confirmation from "./components/Confirmation/Confirmation";

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
        {/* Confirmation Page */}
        <Route path="/confirmation-page" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
