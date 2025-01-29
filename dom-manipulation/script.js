// Load quotes from localStorage when the page loads
function loadQuotesFromLocalStorage() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
      return JSON.parse(storedQuotes);
    }
    return [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
      { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
      { text: "The best way to predict the future is to invent it.", category: "Innovation" },
      { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
    ]; // Default quotes if none in storage
  }
  
  // Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Load the quotes from localStorage
  let quotes = loadQuotesFromLocalStorage();
  
  // Function to display a random quote
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const selectedCategory = document.getElementById('categorySelect').value;
    
    let filteredQuotes = quotes;
    if (selectedCategory) {
      filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }
    
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];
      quoteDisplay.innerHTML = `<strong>${randomQuote.category}:</strong> "${randomQuote.text}"`;
      
      // Save the last viewed quote in sessionStorage
      saveLastViewedQuote(randomQuote);
    } else {
      quoteDisplay.innerHTML = "No quotes available in this category.";
    }
  }
  
  // Function to save the last viewed quote to sessionStorage
  function saveLastViewedQuote(quote) {
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
  }
  
  // Function to retrieve the last viewed quote from sessionStorage
  function getLastViewedQuote() {
    const lastQuote = sessionStorage.getItem('lastViewedQuote');
    return lastQuote ? JSON.parse(lastQuote) : null;
  }
  
  // Function to populate the category select dropdown
  function populateCategorySelect() {
    const categorySelect = document.getElementById('categorySelect');
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories
  
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  }
  
  // Function to add a new quote to the quotes array and update the DOM
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes();  // Save to localStorage
      document.getElementById('newQuoteText').value = ''; // Clear input fields
      document.getElementById('newQuoteCategory').value = '';
      
      // Update the category dropdown in case a new category was added
      populateCategorySelect();
      
      alert('Quote added successfully!');
      showRandomQuote(); // Display a random quote immediately
    } else {
      alert('Please enter both a quote and a category.');
    }
  }
  
  // Function to export quotes as a JSON file
  function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);  // Add the imported quotes
        saveQuotes();  // Save to localStorage
        alert('Quotes imported successfully!');
        showRandomQuote();  // Display a random quote after import
      } else {
        alert('Invalid JSON format.');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Initialize page
  window.onload = () => {
    populateCategorySelect();
    showRandomQuote();  // Display a random quote on page load
  };
  

  
  
  
  
  