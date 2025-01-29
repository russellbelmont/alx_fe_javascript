// Simulating server URL (JSONPlaceholder)
const serverUrl = "https://jsonplaceholder.typicode.com/posts";

// Load quotes from localStorage when the page loads
function loadQuotesFromLocalStorage() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        return JSON.parse(storedQuotes);
    }
    return [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration", id: 1 },
        { text: "Do what you can, with what you have, where you are.", category: "Motivation", id: 2 },
        { text: "The best way to predict the future is to invent it.", category: "Innovation", id: 3 },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life", id: 4 }
    ]; // Default quotes if none in storage
}

// Save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Fetch quotes from the server using a mock API
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverUrl);
        const serverQuotes = await response.json();
        return serverQuotes;
    } catch (error) {
        console.error("Error fetching quotes from server:", error);
    }
}

// Posting new data to the server using a mock API (using POST)
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(serverUrl, {
            method: "POST", // Post method to send data
            headers: {
                "Content-Type": "application/json" // Sending data as JSON
            },
            body: JSON.stringify(quote) // The quote data as JSON
        });
        
        const result = await response.json();
        console.log("Quote posted to server:", result);
    } catch (error) {
        console.error("Error posting quote to server:", error);
    }
}

// Sync local quotes with the server
async function syncQuotes() {
    try {
        const serverQuotes = await fetchQuotesFromServer();
        if (serverQuotes) {
            // Compare server data with local data and handle conflicts
            resolveConflicts(serverQuotes);
        }
    } catch (error) {
        console.error("Error syncing quotes with server:", error);
    }
}

// Resolve conflicts by prioritizing server data
function resolveConflicts(serverQuotes) {
    let localQuotes = loadQuotesFromLocalStorage();
    
    // Simulating conflict resolution: prioritize server data
    serverQuotes.forEach(serverQuote => {
        const localQuoteIndex = localQuotes.findIndex(localQuote => localQuote.id === serverQuote.id);
        
        if (localQuoteIndex === -1) {
            // If quote doesn't exist locally, add it
            localQuotes.push(serverQuote);
        } else {
            // If quote exists locally, replace it with the server data
            localQuotes[localQuoteIndex] = serverQuote;
        }
    });

    // Save the updated quotes to localStorage after resolving conflicts
    localStorage.setItem('quotes', JSON.stringify(localQuotes));

    // Notify user that quotes have been synced with the server
    notifyUser("Quotes synced with server!");
    filterQuotes(); // Update the displayed quotes
}

// Periodically checking for new quotes from the server
setInterval(syncQuotes, 10000); // Sync every 10 seconds

// Notify user about updates
function notifyUser(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.backgroundColor = "#4CAF50";
    notification.style.color = "white";
    notification.style.padding = "10px";
    notification.style.margin = "10px 0";
    notification.style.textAlign = "center";
    document.body.appendChild(notification);
    
    // Automatically hide the notification after 5 seconds
    setTimeout(() => notification.remove(), 5000);
}

// Filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');

    // Load quotes from localStorage
    const quotes = loadQuotesFromLocalStorage();

    // Filter the quotes by the selected category
    let filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    // Update the displayed quotes
    quoteDisplay.innerHTML = filteredQuotes.length
        ? filteredQuotes.map(quote => `<strong>${quote.category}:</strong> "${quote.text}"`).join('<br>')
        : 'No quotes available in this category.';
}

// Add a new quote
async function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { 
            text: newQuoteText, 
            category: newQuoteCategory,
            id: Date.now() // Generate a unique ID based on current timestamp
        };
        
        const quotes = loadQuotesFromLocalStorage();
        quotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(quotes));

        // Post the new quote to the server
        await postQuoteToServer(newQuote); // Ensure the quote is posted to the server

        alert('Quote added successfully!');
        filterQuotes(); // Update the displayed quotes immediately
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// Export quotes as JSON file
function exportToJson() {
    const quotes = loadQuotesFromLocalStorage();
    const blob = new Blob([JSON.stringify(quotes)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
            localStorage.setItem('quotes', JSON.stringify(importedQuotes));  // Replace with imported quotes
            alert('Quotes imported successfully!');
            filterQuotes();  // Display quotes after import
        } else {
            alert('Invalid JSON format.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', filterQuotes);

// Event listener for the "Show Random Quote" button
document.getElementById('randomQuote').addEventListener('click', showRandomQuote);

// Event listener for importing and exporting
document.getElementById('exportJson').addEventListener('click', exportToJson);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// Initialize page
window.onload = () => {
    filterQuotes(); // Display quotes when the page loads
};


  
  
  
  