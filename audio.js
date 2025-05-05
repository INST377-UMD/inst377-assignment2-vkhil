function startListening() {
    if (typeof annyang !== 'undefined') {
      const commands = {
        'hello': () => alert('Hello World!'),
  
        'change the color to *color': (color) => {
          document.body.style.backgroundColor = color;
        },
  
        'navigate to *page': (page) => {
          const target = page.toLowerCase();
          if (['home', 'stocks', 'dogs'].includes(target)) {
            window.location.href = `${target}.html`;
          }
        },
  
        'lookup *ticker': (ticker) => {
          const tickerInput = document.getElementById('ticker');
          const rangeSelect = document.getElementById('range');
  
          if (tickerInput && rangeSelect && typeof window.lookupStock === 'function') {
            tickerInput.value = ticker.toUpperCase();
            rangeSelect.value = "30";
            lookupStock();
          } else {
            alert("You're not on the Stocks page.");
          }
        },
  
        'load dog breed *breed': (breed) => {
          if (typeof window.loadBreedInfo === 'function') {
            window.loadBreedInfo(breed.toLowerCase());
          } else {
            alert("You're not on the Dogs page.");
          }
        }
      };
  
      annyang.addCommands(commands);
      annyang.start();
    } else {
      alert("Annyang is not available.");
    }
  }
  
  function stopListening() {
    if (typeof annyang !== 'undefined') {
      annyang.abort();
    }
  }
  