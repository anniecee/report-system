import React from "react";
import "./Form.css";

const Form: React.FC = () => {
  return (
    <div className="form-section">
      <h1>Report an Emergency</h1>
      <p>Fill in the necessary information to report an emergency</p>

      <form action="submit_form.txt" method="post">
        <div className="form-group">
          {/* Witness Information */}
          <div className="witness">
            <h2>Witness Information</h2>
            <div className="input-row">
              <div className="input-field">
                <label htmlFor="fullName">
                  Full Name <span>(required)</span>
                </label>
                <input type="text" id="fullName" name="fullName" required />
              </div>
              <div className="input-field">
                <label htmlFor="phoneNumber">
                  Phone Number <span>(required)</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
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
                <input type="text" id="location" name="location" required />
              </div>
              <div className="input-field">
                <label htmlFor="coordinate">
                  Coordinate <span>(optional)</span>
                </label>
                <input type="text" id="coordinate" name="coordinate" />
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
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="imageUrl">
                  Image URL <span>(optional)</span>
                </label>
                <input type="url" id="imageUrl" name="imageUrl" />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="description">
                Description <span>(required)</span>
              </label>
              <textarea
                id="description"
                name="description"
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
            <button type="reset" className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
