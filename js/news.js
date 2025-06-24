import { NewsCard } from './components/NewsCard.js';

export function loadNews() {
  const newsList = document.getElementById('news-list');

  const newsItems = [
    {
      title: "SAPS Crime Statistics Q4 2024_2025",
      date: "January - March, 2025",
      link: "https://www.saps.gov.za/services/crimestats.php",
      summary: "Latest quarterly crime statistics released showing trends across Western Cape precincts."
    },
    {
      title: "Community Policing Forum Updates",
      date: "June, 2025",
      link: "https://www.saps.gov.za/journal/comm_pol.php",
      summary: "New community safety initiatives launched in high-risk areas."
    }
  ];

  newsList.innerHTML = ''; // Clear placeholder/loading content

  newsItems.forEach(item => {
    newsList.appendChild(NewsCard(item));
  });
}
