const quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Do one thing every day that scares you.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
  ];
  
  function displayRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
  
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available!";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.textContent = `"${quote.text}" - [${quote.category}]`;
  }
  
  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();
  
    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
  
      alert("Quote added successfully!");
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
  
      if (quotes.length === 1) {
        displayRandomQuote();
      }
    } else {
      alert("Please enter both the quote text and category.");
    }
  }
  
  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
  document.getElementById("addQuote").addEventListener("click", addQuote);
  
  
  
  