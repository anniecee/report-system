# Metro Vancouver Emergency Reporting System

A web-based platform for the Metro Vancouver 9-1-1 Emergency Call Answer Service (which processes ~1M calls/year): the public can submit emergency reports online, and E-Comm operators can review, update, and resolve them, with interactive mapping of emergency locations for situational awareness.

## Features

### Emergency Reporting
- Submit reports with reporter name/phone, nature and location of the emergency, optional image link and comments

### Map Integration
- Emergency locations on an interactive map (Leaflet + OpenStreetMap)
- Click markers for details, highlight markers from the report list
- Report list updates dynamically with map zoom

### Report Management
- Edit or delete reports with passcode protection

### User Feedback
- Real-time input validation and error feedback

## Tech Stack
- React 18, TypeScript, Vite
- Leaflet / react-leaflet, OpenStreetMap
- Browser local storage for data persistence

## Getting Started

Prerequisites: Node.js 18+

```bash
git clone https://github.com/anniecee/report-system.git
cd report-system
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).
