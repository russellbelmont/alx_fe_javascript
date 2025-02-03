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
  
  // Post a new quote to the server using a mock API (JSONPlaceholder)
  async function postQuoteToServer(newQuote) {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newQuote.text,
          body: newQuote.category,
          userId: 1,
        }),
      });
  
      if (response.ok) {
        const postedQuote = await response.json();
        console.log("Posted new quote to server:", postedQuote);
        return postedQuote;
      } else {
        console.error("Failed to post the quote to the server.");
      }
    } catch (error) {
      console.error("Error posting quote to the server:", error);
    }
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
        showNotification("Quotes have been synced with the server.");
      }
  
      // Refresh the quotes display
      showRandomQuote();
    } catch (error) {
      console.error("Error syncing quotes with the server:", error);
    }
  }
  
  // Save quotes to local storage
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
  setInterval(syncQuotes, 10000); // Sync every 10 seconds
  
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
  
  
  
  
  