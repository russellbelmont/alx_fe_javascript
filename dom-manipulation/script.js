// Simulating the server interaction with a mock API URL (JSONPlaceholder)
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // You can replace this with an actual API endpoint

// Array to store quotes
let quotes = [
    { id: 1, text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { id: 2, text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
];

// Function to fetch quotes from the "server" (mock API)
async function fetchServerQuotes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Assuming the server returns an array of quotes
        syncQuotes(data); // Sync with the server data
    } catch (error) {
        console.error('Error fetching server quotes:', error);
    }
}

// Function to sync local data with server data
function syncQuotes(serverQuotes) {
    const localIds = quotes.map(quote => quote.id);
    const serverIds = serverQuotes.map(quote => quote.id);

    // Detect conflicts: If IDs match, but content differs, handle conflict
    for (let serverQuote of serverQuotes) {
        const localQuoteIndex = quotes.findIndex(quote => quote.id === serverQuote.id);
        if (localQuoteIndex >= 0) {
            // If text differs, we have a conflict
            if (quotes[localQuoteIndex].text !== serverQuote.text) {
                document.getElementById('conflictNotification').style.display = 'block';
                quotes[localQuoteIndex] = serverQuote; // Server data takes precedence
            }
        } else {
            // New quote on the server, add it to the local array
            quotes.push(serverQuote);
        }
    }

    // Save the updated quotes to localStorage and refresh display
    saveQuotes();
    displayQuotes();
}

// Function to display quotes
function displayQuotes() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear previous quotes
    quotes.forEach(quote => {
        const quoteElement = document.createElement('p');
        quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = {
            id: Date.now(), // Generate a unique ID (mock)
            text: newQuoteText,
            category: newQuoteCategory
        };
        quotes.push(newQuote);
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
        saveQuotes(); // Save quotes to local storage
        displayQuotes(); // Refresh the displayed quotes
    } else {
        alert("Please fill in both fields!");
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const savedQuotes = localStorage.getItem("quotes");
    if (savedQuotes) {
        quotes = JSON.parse(savedQuotes);
    }
}

// Function to export quotes to a JSON file
function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "quotes.json";
    link.click();
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // Save imported quotes to local storage
        displayQuotes(); // Refresh displayed quotes
        alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to resolve conflict (called by user)
function resolveConflict() {
    document.getElementById('conflictNotification').style.display = 'none';
    // You could also give the user the option to choose which data to keep
}

// Periodically fetch server quotes every 10 seconds to keep data synced
setInterval(fetchServerQuotes, 10000); // Fetch every 10 seconds

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", displayQuotes);

// Call the function to create the form when the page loads
createAddQuoteForm();

// Load quotes from local storage when the page loads
loadQuotes();

// Display quotes on page load
displayQuotes();

  
  
  
  
  
  
  
  
  