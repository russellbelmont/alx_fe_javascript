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
  
  // Function to populate the category filter dropdown
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories
  
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Add the "All Categories" option
    const allOption = document.createElement('option');
    allOption.value = "all";
    allOption.textContent = "All Categories";
    categoryFilter.insertBefore(allOption, categoryFilter.firstChild);
  
    // Load the last selected category filter from localStorage
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || "all";
    categoryFilter.value = lastSelectedCategory;
  
    // Filter quotes based on the last selected category on page load
    filterQuotes();
  }
  
  // Function to filter quotes based on the selected category
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Filter the quotes by the selected category
    let filteredQuotes = selectedCategory === "all"
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);
  
    // Update the displayed quotes
    quoteDisplay.innerHTML = filteredQuotes.length
      ? filteredQuotes.map(quote => `<strong>${quote.category}:</strong> "${quote.text}"`).join('<br>')
      : 'No quotes available in this category.';
    
    // Save the last selected category to localStorage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
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
  
      // Update the category filter dropdown in case a new category was added
      populateCategories();
  
      alert('Quote added successfully!');
      filterQuotes(); // Update the displayed quotes immediately
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
        filterQuotes();  // Display a random quote after import
      } else {
        alert('Invalid JSON format.');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', filterQuotes);
  
  // Initialize page
  window.onload = () => {
    populateCategories(); // Populate category filter on page load
  };
  

  
  
  
  
  