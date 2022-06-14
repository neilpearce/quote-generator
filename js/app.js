// Console log for debugging
let log = console.log;

// Constants
const doc = document;
const quoteContainer = doc.getElementById('quote__container');
const quoteText = doc.getElementById('quote');
const authorText = doc.getElementById('author');
const newQuoteBtn = doc.getElementById('new-quote');
const loader = doc.getElementById('loader');

let apiQuotes = [];

const showLoadingSpinner = () => {
    loader.hidden = false; 
    quoteContainer.hidden = true;      
}

const removeLoadingSpinner = () => {
    if ( !loader.hidden ) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    } 
}

const newQuote = () => {
    showLoadingSpinner();
    // Pick a random quote from the API
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length )];
    // Check if author field is blank and replace with 'Unknown'
    if ( !quote.author ) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Check length of quote
    if ( quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set quote and remove loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get quotes from an API
async function getQuotes() {
    showLoadingSpinner();
    const apiURL = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
 
        } catch (err) {
        // Catch any errors
    }
}

// Click event on the new quote button
newQuoteBtn.addEventListener('click', newQuote);
   
getQuotes();



