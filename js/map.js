import L from 'leaflet';
import { getRiskLevel } from './utils.js';
import { MapLegend } from './components/MapLegend.js';

let crimeMap = null;
let mapMarkers = [];
let markerLookup = {};

export function initializeMap(data) {
  if (!crimeMap) {
    crimeMap = L.map('crime-map', { zoomControl: false }).setView([-33.9249, 18.4241], 11);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO &copy; OpenStreetMap contributors',
      subdomains: 'abcd'
    }).addTo(crimeMap);
    L.control.zoom({ position: 'bottomright' }).addTo(crimeMap);

    const overlay = document.querySelector('.map-overlay');
    if (overlay) overlay.appendChild(MapLegend());
  }

  mapMarkers.forEach(marker => crimeMap.removeLayer(marker));
  mapMarkers = [];
  markerLookup = {};

  data.forEach(row => {
    if (row.has_coordinates === 'Yes' && row.latitude && row.longitude) {
      const risk = getRiskLevel(row);
      const trendIcon = row.change_2025_vs_2024_pct > 0 ? '↗️' : '↘️';

      const radius = Math.max(6, 8 + (6 - row.provincial_ranking) * 2);
      const marker = L.circleMarker([row.latitude, row.longitude], {
        radius,
        fillColor: risk.color,
        color: '#ffffff',
        weight: 2,
        fillOpacity: 0.8
      }).addTo(crimeMap);

      marker.bindPopup(`
        <div>
          <h4 style="color:${risk.color};">${row.station_name}</h4>
          <div><strong>${risk.label} Risk</strong> (Rank #${row.provincial_ranking})</div>
          <div><strong>Trend:</strong> ${row.trend_classification}</div>
          <div>${trendIcon} ${Math.abs(row.change_2025_vs_2024_pct)}%</div>
        </div>
      `);

      mapMarkers.push(marker);
      markerLookup[row.station_name] = marker;
    }
  });
}

export function getCrimeMap() {
  return crimeMap;
}

export function getMarkerLookup() {
  return markerLookup;
}

export function flashMarker(marker) {
  const originalOptions = { ...marker.options };
  let flashCount = 0;
  const flashInterval = setInterval(() => {
    if (flashCount >= 6) {
      clearInterval(flashInterval);
      marker.setStyle(originalOptions);
      return;
    }
    marker.setStyle({
      ...originalOptions,
      color: flashCount % 2 === 0 ? '#ffffff' : originalOptions.color,
      weight: flashCount % 2 === 0 ? 4 : originalOptions.weight
    });
    flashCount++;
  }, 200);
}

