import { getRiskLevel } from '../utils.js';

export function AlertCard(row) {
  const risk = getRiskLevel(row);
  const trendIcon = row.change_2025_vs_2024_pct > 0 ? '📈' : '📉';
  const trendColor = row.change_2025_vs_2024_pct > 0 ? '#ef4444' : '#10b981';

  const div = document.createElement('div');
  div.className = 'alert-item';
  div.innerHTML = `
    <h4>${row.station_name}</h4>
    <p style="font-size: 0.9rem;">${risk.description}</p>
    <p><strong>Status:</strong> ${row.trend_classification}</p>
    <p style="color:${trendColor}; font-weight: 600;">
      ${trendIcon} ${Math.abs(row.change_2025_vs_2024_pct)}%
    </p>
  `;
  return div;
}

