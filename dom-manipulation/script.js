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
      saveQuotes(); // Save to local storage
      showRandomQuote(); // Refresh the displayed quote
    } else {
      alert("Please fill in both fields!");
    }
  }
  
  // Function to create a form for adding new quotes (if not already in the DOM)
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
  
  // Simulate fetching quotes from the server
  function fetchQuotesFromServer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulating a response from the server
        const serverQuotes = [
          { text: "To be, or not to be, that is the question.", category: "Philosophy" },
          { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
        ];
        resolve(serverQuotes);
      }, 1000);
    });
  }
  
  // Simulate posting new quotes to the server
  function postQuoteToServer(newQuote) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Posted new quote to server:", newQuote);
        resolve(newQuote);
      }, 1000);
    });
  }
  
  // Function to sync data with the server and resolve conflicts
  function syncWithServer() {
    fetchQuotesFromServer().then((serverQuotes) => {
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
        showNotification("Quotes have been synced with the server.");
      }
  
      // Refresh the quotes display
      showRandomQuote();
    });
  }
  
  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // Show notification for data updates
  function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 3000); // Hide after 3 seconds
  }
  
  // Function to check and sync data periodically
  setInterval(syncWithServer, 10000); // Sync every 10 seconds
  
  // Event listener for the "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Call the function to create the form when the page loads
  createAddQuoteForm();
  
  // Display a random quote on page load
  showRandomQuote();
  
  // Load quotes from local storage if available
  if (localStorage.getItem("quotes")) {
    quotes = JSON.parse(localStorage.getItem("quotes"));
    showRandomQuote();
  }
  
  
  
  
  