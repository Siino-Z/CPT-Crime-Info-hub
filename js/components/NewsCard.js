export function NewsCard({ title, link, summary, date }) {
  const div = document.createElement('div');
  div.className = 'news-item';
  div.innerHTML = `
    <a href="${link}" target="_blank" rel="noopener" class="news-link">${title}</a>
    <p style="margin: 0.5rem 0;">${summary}</p>
    <div class="news-date">${date}</div>
  `;
  return div;
}
