// Array of quote objects
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Passion" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
      <p>${randomQuote.text}</p>
      <p><em>- Category: ${randomQuote.category}</em></p>
    `;
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Clear input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Close the form
      closeAddQuoteForm();
  
      // Display a success message (optional)
      alert('Quote added successfully!');
    } else {
      alert('Please enter both quote and category.');
    }
  }
  
  // Function to show the add quote form
  function showAddQuoteForm() {
    document.getElementById('addQuoteForm').style.display = 'block';
  }
  
  // Function to close the add quote form
  function closeAddQuoteForm() {
    document.getElementById('addQuoteForm').style.display = 'none';
  }
  
  // Event listeners
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuoteButton').addEventListener('click', showAddQuoteForm);
  
  // Initial quote display
  showRandomQuote();

  
  
  
  
  