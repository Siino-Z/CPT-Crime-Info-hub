export function StatCard({ label, value, change, color = '', className = '' }) {
  const div = document.createElement('div');
  div.className = `stat-card ${className}`;
  div.innerHTML = `
    <div class="stat-label">${label}</div>
    <div class="stat-value" style="color: ${color};">${value}</div>
    <div class="stat-change">${change}</div>
  `;
  return div;
}
