const apiKey = 'YCpBET7BEkyQeNjme6ya6JYAcsAD04fbJ8aJkAN5';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Function to fetch and display the image of the day for the current date
function getCurrentImageOfTheDay() {
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Display the fetched data in the "current-image-container"
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            // Display an error message in the "current-image-container"
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <p>Error: ${error.message}</p>
            `;
        });
}

// Function to fetch and display the image of the day for a selected date
function getImageOfTheDay(selectedDate) {
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Display the fetched data in the "current-image-container"
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;

            // Save the selected date to local storage
            saveSearch(selectedDate);

            // Show the selected date in the search history
            addSearchToHistory(selectedDate);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            // Display an error message in the "current-image-container"
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <p>Error: ${error.message}</p>
            `;
        });
}

// Function to save the selected date to local storage
function saveSearch(selectedDate) {
    // Retrieve existing searches from local storage or initialize an empty array
    const searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Add the selected date to the array
    searches.push(selectedDate);

    // Save the updated array back to local storage
    localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to show the selected date in the search history
function addSearchToHistory(selectedDate) {
    // Retrieve the search history list element
    const searchHistoryList = document.getElementById('search-history');

    // Create a list item for the selected date
    const listItem = document.createElement('li');
    listItem.textContent = selectedDate;

    // Add a click event listener to fetch and display data for the selected date again
    listItem.addEventListener('click', () => {
        getImageOfTheDay(selectedDate);
    });

    // Append the list item to the search history list
    searchHistoryList.appendChild(listItem);
}

// Add a form submission event listener to the search form
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const selectedDate = searchInput.value;
    getImageOfTheDay(selectedDate);
});

// Call the function to display the image of the day for the current date when the page loads
getCurrentImageOfTheDay();
