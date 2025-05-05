async function lookupStock() {
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const days = parseInt(document.getElementById('range').value);
    const key = 'o3ZqMJTsUrjHXIjV9MhpDPsC2plgp5J1'; 
  
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    const from = start.toISOString().split('T')[0];
    const to = end.toISOString().split('T')[0];
  
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&apiKey=${key}`;
  
    try {
      const res = await fetch(url);
      const json = await res.json();
      console.log("API response:", json);
  
      if (!json.results || json.results.length === 0) {
        alert("No data available for this ticker.");
        return;
      }
  
      const labels = json.results.map(pt => new Date(pt.t).toLocaleDateString());
      const data = json.results.map(pt => pt.c);
  
      new Chart(document.getElementById('stockChart'), {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `${ticker} Close Price`,
            data
          }]
        }
      });
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch stock data.");
    }
  }
  
  window.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03");
      const data = await res.json();
      const table = document.querySelector('#redditStocksTable tbody');
      table.innerHTML = '';
      data.slice(0, 5).forEach(stock => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
          <td>${stock.no_of_comments}</td>
          <td>${stock.sentiment} ${stock.sentiment === 'Bullish' ? '🐂' : '🐻'}</td>`;
        table.appendChild(row);
      });
    } catch (err) {
      console.error("Reddit stocks fetch failed:", err);
    }
  });
  