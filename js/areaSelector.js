import { getRiskLevel } from './utils.js';
import { StatCard } from './components/StatCard.js';
import { getCrimeMap, getMarkerLookup, flashMarker } from './map.js';

export function setupAreaSelector(data) {
  const select = document.getElementById('area-select');
  select.innerHTML = data
    .sort((a, b) => a.provincial_ranking - b.provincial_ranking)
    .map(row => {
      const risk = getRiskLevel(row);
      return `<option value="${row.station_name}">${row.station_name} (${risk.label})</option>`;
    }).join('');

  // Set default value to first area
  select.value = data[0].station_name;

  function handleAreaChange(stationName) {
    const selectedRow = data.find(r => r.station_name === stationName);
    displayAreaDetails(selectedRow);

    // Map interactivity
    const markerLookup = getMarkerLookup();
    const crimeMap = getCrimeMap();
    if (markerLookup && crimeMap && markerLookup[stationName]) {
      const marker = markerLookup[stationName];
      crimeMap.setView(marker.getLatLng(), 14, { animate: true, duration: 1.5 });
      setTimeout(() => {
        marker.openPopup();
        flashMarker(marker);
      }, 800); // Wait for zoom animation
    }
  }

  select.addEventListener('change', () => {
    handleAreaChange(select.value);
  });

  // Show first area by default and trigger map zoom/flash
  handleAreaChange(select.value);
}

function displayAreaDetails(row) {
  const risk = getRiskLevel(row);
  const info = document.getElementById('area-info');
  const stats = document.getElementById('area-stats');
  const section = document.getElementById('area-stats-section');
  section.style.display = 'block';

  // Add status fields as a grid below the colored header
  info.innerHTML = `
    <div style="background:${risk.color}; color:white; padding:1rem; border-radius:12px; margin-bottom:1rem;">
      <h4 style="margin:0 0 0.5rem 0; font-size:1.3rem;">${row.station_name}</h4>
      <div style="font-size:0.9rem; opacity:0.9;">${risk.description}</div>
    </div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem; font-size:0.9rem;">
      <div><strong>Provincial Ranking:</strong> #${row.provincial_ranking}</div>
      <div><strong>Trend:</strong> ${row.trend_classification}</div>
      <div><strong>Performance:</strong> ${row.performance_score}</div>
      <div><strong>Status:</strong> ${row.improvement_status}</div>
    </div>
  `;

  stats.innerHTML = '';
  stats.appendChild(StatCard({
    label: 'Risk Level',
    value: risk.label,
    change: `Rank #${row.provincial_ranking}`,
    className: risk.class
  }));
  stats.appendChild(StatCard({
    label: 'Current Quarter',
    value: row.crimes_2025_q4.toLocaleString(),
    change: 'Q4 2025'
  }));
  stats.appendChild(StatCard({
    label: 'Year-over-Year',
    value: `${row.change_2025_vs_2024_pct > 0 ? '↗️' : '↘️'} ${Math.abs(row.change_2025_vs_2024_pct)}%`,
    change: 'vs 2024',
    color: row.change_2025_vs_2024_pct > 0 ? '#ef4444' : '#10b981'
  }));
  stats.appendChild(StatCard({
    label: '5-Year Total',
    value: row.total_crimes_5_years.toLocaleString(),
    change: '2021–2025'
  }));
  stats.appendChild(StatCard({
    label: 'Annual Average',
    value: row.average_crimes_per_year.toLocaleString(),
    change: 'per year'
  }));
}
