// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use built-in body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross-origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});

// GET route to return projectData
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route to add data to projectData
app.post('/add', (req, res) => {
    projectData = req.body;
    res.send({ message: 'Data added successfully' });
});
