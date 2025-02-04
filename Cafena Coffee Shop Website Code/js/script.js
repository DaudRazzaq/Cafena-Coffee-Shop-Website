let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
let cartItem = document.querySelector('.cart-items-container');
let searchBox = document.querySelector('#search-box');
let searchButton = document.querySelector('#search-btn'); // Reference to search button
let searchResults = document.createElement('div');

// Add a results container dynamically
searchResults.id = 'search-results';
searchResults.style.display = 'none';
searchResults.style.position = 'absolute';
searchResults.style.background = '#fff';
searchResults.style.border = '1px solid #ccc';
searchResults.style.width = 'calc(100% - 20px)';
searchResults.style.maxHeight = '200px';
searchResults.style.overflowY = 'auto';
searchResults.style.zIndex = '100';
searchResults.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
searchResults.style.padding = '10px';
searchResults.style.marginTop = '5px';
searchForm.appendChild(searchResults);

// Sample data to search
const items = [
    { name: 'Choco Luxe Mocha', id: 'choco-luxe-mocha' },
    { name: 'Rustic Americano', id: 'rustic-americano' },
    { name: 'Midnight Cold Brew', id: 'midnight-cold-brew' },
    { name: 'Cloudy Latte', id: 'cloudy-latte' },
    { name: 'Young Espresso', id: 'young-espresso' },
    { name: 'Velvet Cappuccino', id: 'velvet-cappuccino' }
];

// Navbar toggle
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
};

// Search form toggle
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
    if (searchBox.value.trim()) {
        displaySearchResults(searchBox.value);
    } else {
        searchResults.style.display = 'none'; // Hide results if input is empty
    }
};

// Cart toggle
document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
};

// Close all active elements on scroll
window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
    searchResults.style.display = 'none';
};

// Handle search input
searchBox.addEventListener('input', () => {
    if (searchBox.value.trim()) {
        displaySearchResults(searchBox.value);
    } else {
        searchResults.style.display = 'none'; // Hide results if input is cleared
    }
});

// Display search results
function displaySearchResults(query) {
    const lowerCaseQuery = query.toLowerCase().trim();
    searchResults.innerHTML = ''; // Clear previous results

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(lowerCaseQuery));
    if (filteredItems.length > 0) {
        filteredItems.forEach(item => {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = item.name;
            resultDiv.style.padding = '5px 10px';
            resultDiv.style.borderBottom = '1px solid #ccc';
            resultDiv.style.cursor = 'pointer';

            // Add click functionality for results
            resultDiv.onclick = () => {
                // Scroll to the corresponding menu item
                const targetElement = document.getElementById(item.id);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    searchResults.style.display = 'none'; // Hide results after selection
                    searchBox.value = item.name; // Set the search box value to the selected item
                }
            };

            searchResults.appendChild(resultDiv);
        });
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = '<div>No results found.</div>';
        searchResults.style.display = 'block';
    }
}

// Contact form confirmation
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Display confirmation message
    const confirmationMessage = document.getElementById("confirmationMessage");
    confirmationMessage.textContent = "Thank you! Your message has been sent to us.";
    confirmationMessage.style.display = "block";

    // Optionally, clear the form inputs
    this.reset();

    // Hide the message after 5 seconds
    setTimeout(() => {
        confirmationMessage.style.display = "none";
    }, 5000);
});

// Checkout button functionality
document.getElementById('checkout-button').addEventListener('click', handleCheckout);
