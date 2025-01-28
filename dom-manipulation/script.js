// Initialize an array of quote objects
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Self" }
];

// Function to display a random quote
function showRandomQuote() {
    // Get a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Display the quote in the #quoteDisplay element
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;

    // Only add if both fields are filled
    if (quoteText && quoteCategory) {
        const newQuote = {
            text: quoteText,
            category: quoteCategory
        };

        // Add the new quote to the quotes array
        quotes.push(newQuote);

        // Optionally show the new quote immediately by calling showRandomQuote()
        showRandomQuote();

        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        alert('Quote added successfully!');
    } else {
        alert('Please fill in both fields!');
    }
}

// Event listener to show a new random quote when the button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Optional: Show a random quote initially when the page loads (first-time load)
document.addEventListener('DOMContentLoaded', showRandomQuote);


  
  
  
  
  