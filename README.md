# Weather Journal App

This Weather Journal App allows users to fetch real-time weather data based on a selected country and ZIP code. Users can input their feelings about the weather, and the app dynamically updates the UI to display the most recent entry, including temperature, weather conditions, humidity, wind speed, and more. The app also dynamically changes the background image in the results card based on the weather condition.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [How to Run the Project](#how-to-run-the-project)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features

- Fetches real-time weather data based on ZIP code and country selection.
- Allows users to add personal reflections or feelings about the weather.
- Dynamically updates the UI with temperature, humidity, weather description, and more.
- Changes background image based on current weather condition (e.g., sunny, cloudy, rainy).
- Responsive design for all screen sizes.

## Technologies

- **HTML5** and **CSS3** for the front-end layout and styling.
- **JavaScript** (Vanilla JS) for asynchronous data fetching and dynamic updates.
- **OpenWeatherMap API** for retrieving weather data.
- **Node.js** and **Express.js** for setting up a simple local server.
- **Front End Web Developer & Digital Freelancing Scholarship** project by Udacity and [Your Scholarship Provider].

## Setup and Installation

### Prerequisites

- Node.js and npm installed (download from [https://nodejs.org/](https://nodejs.org/))
- OpenWeatherMap API key (sign up at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up))

### Installation Steps

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Abdurahman-hassan/Weather-Journal-App.git
    ```

2. Navigate into the project directory:

    ```bash
    cd weather-journal-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

    ```env
    API_KEY=your_openweathermap_api_key
    ```

5. In the `app.js` file, replace the `apiKey` variable with your API key from the `.env` file.

    ```javascript
    const apiKey = process.env.API_KEY + '&units=metric';
    ```

## How to Run the Project

1. Start the server:

    ```bash
    node server.js
    ```

2. Open a browser and navigate to:

    ```
    http://localhost:3000
    ```

3. Select a country, enter a ZIP code, add your feelings about the weather, and click **Generate**. The app will fetch the weather data and display it dynamically on the screen.

## Project Structure

```plaintext
weather-journal-app
├── README.md           # Project documentation
├── .env                # Environment variables file (API key)
├── package.json        # npm package file
├── server.js           # Server setup file
├── website
│   ├── app.js          # Main JavaScript for fetching and displaying data
│   ├── utils.js        # Utility functions (dropdown, validation, background setting)
│   ├── index.html      # HTML structure of the app
│   └── style.css       # Styling for the app layout and responsiveness
└── static_files
    ├── sunny.png       # Background images based on weather status
    ├── Cloudy.png
    ├── Rainy.png
    ├── Snowy.png
    ├── Thunderstorm.png
    ├── Windy.png
    └── default.png
