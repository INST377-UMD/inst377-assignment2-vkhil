window.addEventListener('DOMContentLoaded', async () => {
  const quoteContainer = document.getElementById('quote-container');

  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) throw new Error("Network response not ok");

    const data = await response.json();
    quoteContainer.innerText = `"${data.content}" — ${data.author}`;
  } catch (err) {
    console.error("Quote fetch failed:", err);
    quoteContainer.innerText = "Quote unavailable.";
  }
});
