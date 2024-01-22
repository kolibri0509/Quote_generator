const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newTwitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true
}

function getRandomQuote() {
    showLoadingSpinner();
    
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if (!quote.Text) {
        quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    }
    
    if (!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author
    }
    
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text
    removeLoadingSpinner();
}


async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://mocki.io/v1/b9b2b14f-f9e5-4c31-98cf-f50990a6bf84';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        getRandomQuote()
    } catch (error) {
        console.log(error)
    }
}
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getRandomQuote);
newTwitterBtn.addEventListener('click', tweetQuote)

getQuotes();