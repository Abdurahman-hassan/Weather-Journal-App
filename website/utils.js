// utils.js

// List of selected countries with codes and postal code patterns
export const commonCountries = [
    {code: 'US', name: 'United States', pattern: /^\d{5}(-\d{4})?$/},   // US ZIP code
    {code: 'FR', name: 'France', pattern: /^\d{5}$/},                   // France ZIP code
    {code: 'DE', name: 'Germany', pattern: /^\d{5}$/},                  // Germany ZIP code
    {code: 'ES', name: 'Spain', pattern: /^\d{5}$/},                    // Spain ZIP code
    {code: 'JP', name: 'Japan', pattern: /^\d{3}-\d{4}$/},              // Japan ZIP code
    {code: 'AU', name: 'Australia', pattern: /^\d{4}$/},                // Australia ZIP code
    {code: 'BR', name: 'Brazil', pattern: /^\d{5}-?\d{3}$/}             // Brazil ZIP code
];

// Function to populate the country dropdown
export function populateCountryDropdown(dropdownElementId) {
    const dropdown = document.getElementById(dropdownElementId);
    if (dropdown) {
        commonCountries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name;
            dropdown.appendChild(option);
        });
        console.log("Countries loaded successfully in the dropdown.");
    } else {
        console.error(`Dropdown element with id "${dropdownElementId}" not found.`);
    }
}

// Function to validate ZIP code based on the selected country
export function validateZipCode(zip, countryCode) {
    const country = commonCountries.find(c => c.code === countryCode);
    return country && country.pattern ? country.pattern.test(zip) : true;
}

export function setBackgroundImage(weatherStatus) {
    const resultCard = document.querySelector('.result-card'); // Targeting result-card specifically

    // Define path to images folder
    const imagePath = './static_files/';

    // Map OpenWeatherMap's weather statuses to background images
    const weatherBackgrounds = {
        'Clear': `${imagePath}sunny.png`,
        'Clouds': `${imagePath}Cloudy.png`,
        'Rain': `${imagePath}Rainy.png`,
        'Snow': `${imagePath}Snowy.png`,
        'Thunderstorm': `${imagePath}Thunderstorm.png`,
        'Drizzle': `${imagePath}Rainy.png`,
        'Mist': `${imagePath}Cloudy.png`,
        'Fog': `${imagePath}Cloudy.png`,
        'Haze': `${imagePath}Cloudy.png`,
        'Dust': `${imagePath}Windy.png`,
        'Smoke': `${imagePath}Windy.png`,
        'Windy': `${imagePath}Windy.png`
    };

    // Select the background image based on weather status
    const backgroundImage = weatherBackgrounds[weatherStatus] || `${imagePath}default.png`;

    // Set the background image with opacity using a CSS variable
    resultCard.style.setProperty('--background-image', `url('${backgroundImage}')`);
}


