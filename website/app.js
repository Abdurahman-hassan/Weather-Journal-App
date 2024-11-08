import { populateCountryDropdown, validateZipCode, setBackgroundImage } from './utils.js';

// Personal API Key for OpenWeatherMap API
const apiKey = process.env.API_KEY + '&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Populate the country dropdown with selected countries
populateCountryDropdown('country');

// Event listener for button click
document.getElementById('generate').addEventListener('click', performAction);

// Function to display messages in the message div
function displayMessage(message, color = 'red') {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = color;
}

// Function to show loading state
function showLoading(isLoading) {
    const button = document.getElementById('generate');
    button.disabled = isLoading;
    button.textContent = isLoading ? 'Loading...' : 'Generate';
}

// Function to handle weather data retrieval
async function performAction() {
    const zipCode = document.getElementById('zip').value.trim();
    const feelings = document.getElementById('feelings').value.trim();
    const country = document.getElementById('country').value;
    const date = new Date().toLocaleDateString();

    // Validate ZIP code for the selected country
    if (!validateZipCode(zipCode, country)) {
        displayMessage("Invalid ZIP code for the selected country. Please enter a correct ZIP code.", 'red');
        return;
    }

    displayMessage('');
    showLoading(true);

    // Fetch weather data using the validated ZIP code and country
    try {
        const data = await getWeatherDataByZip(zipCode, country);
        if (data) {
            const cityName = data.name || "City not detected";
            displayMessage(`Weather data for ${cityName} retrieved successfully!`, 'green');

            setBackgroundImage(data.weather[0].main);

            // Post data to the server
            await postData('/add', {
                temperature: data.main.temp,
                feels_like: data.main.feels_like,
                weather: data.weather[0].description,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                cityName,
                date,
                userResponse: feelings
            });

            updateUI(data, date, feelings);
        } else {
            displayMessage("Weather data not found for this ZIP code and country.", 'red');
        }
    } catch (error) {
        console.error("Error retrieving weather data:", error);
        displayMessage("An error occurred while fetching data. Please try again.", 'red');
    } finally {
        showLoading(false);
    }
}

// Function to GET Web API Data by ZIP code and country
const getWeatherDataByZip = async (zip, country) => {
    const url = `${baseURL}${zip},${country}&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === "404") return null;
    return data;
};

// Function to POST data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

// Function to update the UI with additional data
function updateUI(data, date, feelings) {
    document.getElementById('dateDisplay').textContent = date;
    document.getElementById('tempDisplay').textContent = `${Math.round(data.main.temp)}°F`;
    document.getElementById('feelsLikeDisplay').textContent = `${Math.round(data.main.feels_like)}°F`;
    document.getElementById('weatherDisplay').textContent = data.weather[0].description;
    document.getElementById('pressureDisplay').textContent = `${data.main.pressure} hPa`;
    document.getElementById('humidityDisplay').textContent = `${data.main.humidity}%`;
    document.getElementById('windDisplay').textContent = `${data.wind.speed} m/s`;
    document.getElementById('contentDisplay').textContent = feelings;
}

