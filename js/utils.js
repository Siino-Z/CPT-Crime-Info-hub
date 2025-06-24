import Papa from 'papaparse';

// ========== Crime Risk Calculation ==========
export function getRiskLevel(row) {
  const rank = Number(row.provincial_ranking);
  if (rank >= 1 && rank <= 5) {
    return {
      label: "Critical",
      class: "critical",
      color: "#dc2626",
      description: "Extreme risk - avoid if possible"
    };
  }
  if (rank >= 6 && rank <= 10) {
    return {
      label: "High",
      class: "high",
      color: "#ea580c",
      description: "High risk - exercise extreme caution"
    };
  }
  if (rank >= 11 && rank <= 15) {
    return {
      label: "Medium",
      class: "medium",
      color: "#d97706",
      description: "Moderate risk - stay alert"
    };
  }
  return {
    label: "Low",
    class: "low",
    color: "#059669",
    description: "Lower risk - maintain awareness"
  };
}

// ========== Fetch & Format Crime Data ==========
export function fetchCrimeData() {
  return new Promise(resolve => {
    Papa.parse('crime-data.csv', {
      download: true,
      header: true,
      complete: function(results) {
        const formatted = results.data.map(row => ({
          ...row,
          provincial_ranking: Number(row.provincial_ranking),
          crimes_2025_q4: Number(row.crimes_2025_q4),
          change_2025_vs_2024_pct: Number(row.change_2025_vs_2024_pct),
          total_crimes_5_years: Number(row.total_crimes_5_years),
          average_crimes_per_year: Number(row.average_crimes_per_year),
          latitude: Number(row.latitude),
          longitude: Number(row.longitude)
        }));
        resolve(formatted);
      }
    });
  });
}

// ========== Marker Animation ==========
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

// ========== Date Utility ==========
/**
 * Returns a formatted current datetime string for display.
 */
export function getLiveDateTimeString() {
  const now = new Date();
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return now.toLocaleDateString('en-ZA', options);
}
