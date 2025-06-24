export function MapLegend() {
  const legend = document.createElement('div');
  legend.className = 'map-legend';

  const levels = [
    { color: '#dc2626', label: 'Critical Risk' },
    { color: '#ea580c', label: 'High Risk' },
    { color: '#d97706', label: 'Medium Risk' },
    { color: '#059669', label: 'Low Risk' }
  ];

  levels.forEach(level => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <div class="legend-color" style="background: ${level.color};"></div>
      <span>${level.label}</span>
    `;
    legend.appendChild(item);
  });

  return legend;
}
