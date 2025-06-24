export function LiveIndicator() {
  const div = document.createElement('div');
  div.className = 'live-indicator';
  div.innerHTML = `
    <div class="live-dot"></div>
    <span id="live-status">Latest Data</span>
    <span id="live-date"></span>
  `;
  return div;
}
