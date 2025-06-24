# CPT-Crime-Info-hub

## Overview

**CPT Crime Intelligence Hub** is an advanced, interactive crime intelligence dashboard focused on Cape Town, South Africa. It delivers up-to-date analytics, predictive insights, and visualizations to empower communities in making informed decisions about safety and crime trends.

## Features

- **Interactive Map:** Visualize crime hotspots and trends across Cape Town precincts.
- **Area Intelligence Dashboard:** Select any precinct to view detailed risk levels, trends, and performance metrics.
- **Critical Alerts:** Instantly see areas with the highest risk and recent negative trends.
- **Official Updates:** Stay informed with the latest SAPS news and community policing initiatives.
- **Safety Tips:** Practical advice for personal and community safety.
- **Emergency Info:** Quick access to emergency contact details.
- **Latest Data:** Dashboard reflects the most recent available SAPS data (2024–2025 Q4, Cape Town subset).

## Technologies Used

- **HTML, CSS, JavaScript (ES Modules)**
- [Leaflet.js](https://leafletjs.com/) — Interactive mapping
- [PapaParse](https://www.papaparse.com/) — CSV data parsing
- [Vite](https://vitejs.dev/) — Modern frontend tooling

## Data & Attribution

- **Data Source:** South African Police Service (SAPS) 2024–2025 Q4.  
  *Cape Town subset, cleaned and aggregated by Sinothabo Zwane.*
- **Note:** This dashboard is for demonstration and educational purposes. Data is not live, but reflects the latest available SAPS release.

## Usage

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
4. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
root/
├── .github/
│   ├── workflows/
├── css/
│   └── style.css
├── js/
│   ├── components/
│   ├── areaSelector.js
│   ├── main.js
│   ├── map.js
│   ├── news.js
│   ├── renderAlerts.js
│   └── utils.js
├── public/
│   └── crime-data.csv
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## License & Rights

This dashboard and all code are © 2025 Sinothabo Zwane.  
All rights reserved. Unauthorized use or redistribution is prohibited.

---

**Developed by Sinothabo Zwane**
