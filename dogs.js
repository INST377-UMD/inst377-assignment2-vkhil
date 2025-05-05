async function loadDogs() {
    const res = await fetch('https://dog.ceo/api/breeds/image/random/10');
    const data = await res.json();
    const carousel = document.getElementById('dog-carousel');
    data.message.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      carousel.appendChild(img);
    });
  }
  
  async function loadBreeds() {
    const res = await fetch('https://api.thedogapi.com/v1/breeds');
    const breeds = await res.json();
    const container = document.getElementById('breed-buttons');
    breeds.forEach(breed => {
      const btn = document.createElement('button');
      btn.innerText = breed.name;
      btn.onclick = () => loadBreedInfo(breed.name.toLowerCase());
      container.appendChild(btn);
    });
  }
  
  async function loadBreedInfo(name) {
    const res = await fetch('https://api.thedogapi.com/v1/breeds');
    const breeds = await res.json();
    const breed = breeds.find(b => b.name.toLowerCase() === name);
    if (!breed) {
      alert(`Breed "${name}" not found.`);
      return;
    }
  
    const div = document.getElementById('breed-info');
    div.style.display = 'block';
    div.innerHTML = `
      <h3>${breed.name}</h3>
      <p><strong>Temperament:</strong> ${breed.temperament}</p>
      <p><strong>Life Expectancy:</strong> ${breed.life_span}</p>`;
  }
  
  
  window.loadBreedInfo = loadBreedInfo;
  
  window.addEventListener('DOMContentLoaded', () => {
    loadDogs();
    loadBreeds();
  });
  