// Description: Renders critical alerts in a grid format
import { AlertCard } from './components/AlertCard.js';

export function renderCriticalAlerts(data) {
  const critical = data.filter(r => r.provincial_ranking <= 5);
  const alertGrid = document.getElementById('alert-grid');

  alertGrid.innerHTML = '';

  if (critical.length === 0) {
    alertGrid.innerHTML = `
      <div class="alert-item">
        <h4>✅ No Critical Alerts</h4>
        <p>All areas are currently within acceptable risk parameters.</p>
      </div>`;
    return;
  }

  critical.forEach(row => {
    alertGrid.appendChild(AlertCard(row));
  });
}

