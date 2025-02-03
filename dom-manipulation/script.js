// Array to store quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
];

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><em>${randomQuote.category}</em>`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
        saveQuotes(); // Save quotes to local storage
        populateCategories(); // Update the category filter dropdown
        showRandomQuote(); // Refresh the displayed quote
    } else {
        alert("Please fill in both fields!");
    }
}

// Function to create a form for adding new quotes
function createAddQuoteForm() {
    const formContainer = document.createElement("div");

    const quoteInput = document.createElement("input");
    quoteInput.type = "text";
    quoteInput.id = "newQuoteText";
    quoteInput.placeholder = "Enter a new quote";

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.id = "newQuoteCategory";
    categoryInput.placeholder = "Enter quote category";

    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.onclick = addQuote;

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
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
        populateCategories(); // Update the category filter dropdown
        alert("Quotes imported successfully!");
        showRandomQuote(); // Refresh the displayed quote
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to populate the category filter dropdown with unique categories
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = new Set(quotes.map((quote) => quote.category));

    // Clear existing options
    categoryFilter.innerHTML = "<option value='all'>All Categories</option>";

    // Add new options for each unique category
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Load the last selected category filter from localStorage
    const lastSelectedCategory = localStorage.getItem("lastCategoryFilter");
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
    }
}

// Function to filter quotes by selected category
function filterQuotes() {
    const categoryFilter = document.getElementById("categoryFilter");
    const selectedCategory = categoryFilter.value;

    // Save the selected filter to localStorage
    localStorage.setItem("lastCategoryFilter", selectedCategory);

    // Filter quotes based on selected category
    const filteredQuotes = selectedCategory === "all" 
      ? quotes 
      : quotes.filter((quote) => quote.category === selectedCategory);

    // Display the first filtered quote (you can change this to display all quotes if you want)
    if (filteredQuotes.length > 0) {
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        const quoteDisplay = document.getElementById("quoteDisplay");
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><em>${randomQuote.category}</em>`;
    } else {
        document.getElementById("quoteDisplay").innerHTML = "No quotes available for this category.";
    }
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Call the function to create the form when the page loads
createAddQuoteForm();

// Load quotes from local storage when the page loads
loadQuotes();

// Populate the category filter and load the last selected category filter
populateCategories();

// Display a random quote on page load
showRandomQuote();

// Create and display the notification element
const notificationElement = document.createElement("div");
notificationElement.id = "notification";
notificationElement.style.display = "none";
notificationElement.style.backgroundColor = "lightblue";
notificationElement.style.padding = "10px";
notificationElement.style.position = "absolute";
notificationElement.style.top = "10px";
notificationElement.style.right = "10px";
notificationElement.style.borderRadius = "5px";
document.body.appendChild(notificationElement);

// Function to show notification for data updates
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000); // Hide after 3 seconds
}

// Sync quotes with the server and resolve conflicts
async function syncQuotes() {
    try {
        const serverQuotes = await fetchQuotesFromServer();
        const serverQuoteTexts = serverQuotes.map((quote) => quote.text);

        // Check for conflicts (quotes that exist locally but not on the server)
        const conflictingQuotes = quotes.filter(
            (localQuote) => !serverQuoteTexts.includes(localQuote.text)
        );

        if (conflictingQuotes.length > 0) {
            // Simulate conflict resolution (server data takes precedence)
            console.log("Conflicting quotes found. Resolving...");
            quotes = [...serverQuotes];
            saveQuotes(); // Save the resolved quotes to local storage
            showNotification("Local quotes have been updated with the server data.");
        } else {
            // No conflicts, just sync
            console.log("No conflicts. Syncing complete.");
            quotes = [...serverQuotes];
            saveQuotes(); // Save the updated quotes to local storage
            showNotification("Quotes synced with server!"); // This is the specific message for success
        }

        // Refresh the quotes display
        showRandomQuote();
    } catch (error) {
        console.error("Error syncing quotes with the server:", error);
        showNotification("Error syncing quotes with server.");
    }
}

// Fetch quotes from the server using a mock API (JSONPlaceholder)
async function fetchQuotesFromServer() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const serverQuotes = await response.json();
        // Limit the results to 5 quotes for simplicity
        return serverQuotes.slice(0, 5).map((quote) => ({
            text: quote.title,
            category: "General", // Example category, you can modify this
        }));
    } catch (error) {
        console.error("Error fetching quotes from the server:", error);
    }
}

// Set interval to sync quotes every 10 seconds
setInterval(syncQuotes, 10000); // Sync every 10 seconds

  

  
  
  
  
  
  
  
  
  