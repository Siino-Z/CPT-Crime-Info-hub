import 'leaflet/dist/leaflet.css';
import { fetchCrimeData } from './utils.js';
import { initializeMap } from './map.js';
import { renderCriticalAlerts } from './renderAlerts.js';
import { setupAreaSelector } from './areaSelector.js';
import { loadNews } from './news.js';
import { LiveIndicator } from './components/LiveIndicator.js';
import { getLiveDateTimeString } from './utils.js';
import { ParticleBackground } from './components/ParticleBackground.js';

let crimeData = [];

document.addEventListener('DOMContentLoaded', () => {
  // Replace live indicator placeholder
  const liveContainer = document.querySelector('.live-indicator');
  if (liveContainer) liveContainer.replaceWith(LiveIndicator());

  // Background particles
  ParticleBackground();

  fetchCrimeData().then(data => {
    crimeData = data;
    initializeMap(data);      // Markers created here
    setupAreaSelector(data);  // Now selector can access markers
    renderCriticalAlerts(crimeData);
    loadNews();
  });

  // Update live date every second
  updateLiveDate();
  setInterval(updateLiveDate, 1000);

  document.documentElement.style.scrollBehavior = 'smooth';
});

function updateLiveDate() {
  const liveDate = document.getElementById('live-date');
  if (liveDate) liveDate.textContent = getLiveDateTimeString();
}
