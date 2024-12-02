import React, { useState } from "react";
import Autocomplete from '../Autocomplete/Autocomplete';
import { useNavigate } from "react-router-dom";
import "./Form.css";

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
    coordinate: "",
    emergencyType: "",
    imageUrl: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationSelect = (location: string, lat: string, lon: string) => {
    setFormData((prevData) => ({
      ...prevData,
      location,
      coordinate: `${lat}, ${lon}`,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // this will prevent the page to reload

    // this will retrieve an exisiting report in the storage or start with the new one
    const existingReports = JSON.parse(
      localStorage.getItem("emergencyReports") || "[]"
    );

    // this will add the new form to the list
    const newReport = {
      ...formData,
      timeReported: new Date().toLocaleString(), // add the time of submission
      status: "OPEN", // this is by default
    };

    const updatedReports = [...existingReports, newReport];

    // save the form to the local storage
    localStorage.setItem("emergencyReports", JSON.stringify(updatedReports));

    // so this will reset the form to empty after submission
    setFormData({
      fullName: "",
      phoneNumber: "",
      location: "",
      coordinate: "",
      emergencyType: "",
      imageUrl: "",
      description: "",
    });

    // this will redirect to the confirmation page
    navigate("/confirmation-page");
  };

  return (
    <div className="form-section">
      <h1>Report an Emergency</h1>
      <p>Fill in the necessary information to report an emergency</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* Witness Information */}
          <div className="witness">
            <h2>Witness Information</h2>
            <div className="input-row">
              <div className="input-field">
                <label htmlFor="fullName">
                  Full Name <span>(required)</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  pattern="[A-Za-z]*"
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="phoneNumber">
                  Phone Number <span>(required)</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  pattern="[0-9]*"
                  required
                />
              </div>
            </div>
          </div>

          {/* Emergency Information */}
          <div className="emergency">
            <h2>Emergency Information</h2>
            <div className="input-row">
              <div className="input-field">
                <label htmlFor="location">
                  Location <span>(required)</span>
                </label>
                <Autocomplete
                  onSelect={handleLocationSelect}
                />
              </div>
              <div className="input-field">
                <label htmlFor="coordinate">
                  Coordinate <span>(optional)</span>
                </label>
                <input
                  type="text"
                  id="coordinate"
                  name="coordinate"
                  value={formData.coordinate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-field">
                <label htmlFor="emergencyType">
                  Type of Emergency <span>(required)</span>
                </label>
                <input
                  type="text"
                  id="emergencyType"
                  name="emergencyType"
                  value={formData.emergencyType}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="imageUrl">
                  Image URL <span>(optional)</span>
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="description">
                Description <span>(required)</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="button-container">
            <button type="submit" className="confirm-button">
              Confirm
            </button>
            <button
              type="reset"
              className="cancel-button"
              onClick={() =>
                setFormData({
                  fullName: "",
                  phoneNumber: "",
                  location: "",
                  coordinate: "",
                  emergencyType: "",
                  imageUrl: "",
                  description: "",
                })
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
