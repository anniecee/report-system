# Metro Vancouver Emergency Reporting System

The Metro Vancouver 9-1-1 Emergency Call Answer Service by transitioning from a legacy system to a web-based platform. This new platform allows both the public and E-Comm operators to report, review, and monitor emergencies more efficiently.

---

## Project Overview

### Scenario
The Metro Vancouver 9-1-1 Emergency Call Answer Service processes approximately one million calls annually. This system, developed for E-Comm, enables:
- Civilians to submit emergency reports online.
- Operators to review, update, and resolve emergency statuses efficiently.
- Interactive mapping of emergency locations for better situational awareness.

---

### Key Features
#### Emergency Reporting:
- Users can submit reports with details like:
  - Reporting person's name and phone number.
  - Nature and location of the emergency.
  - Optional image link and comments.

#### Map Integration:
- Emergency locations are displayed on a map using the **Leaflet API** and **OpenStreetMaps**. Users can:
  - View details by interacting with markers.
  - Highlight corresponding markers by selecting emergencies from the list.
  - See a dynamically updated list based on the map's zoom level.

#### Report Management:
- Modify or delete reports with password protection using **MD5 hashing** for secure passcode storage.

#### User Feedback:
- The system provides real-time error and input validation feedback.

---

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript (TypeScript optional).
- **Map API**: Leaflet with OpenStreetMaps.
- **Data Storage**: DOM Storage API.
- **Security**: MD5 for passcode hashing.
- **Design Frameworks**: Optional use of libraries like Bootstrap or React.
