// Loading our environment variables.
require('dotenv').config();

// Start the express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// get the port from environment variables
const port = process.env['PORT'] || 8080;

// Allow CORS.
app.use(function(req, res, next) {
    // Just allow CORS for our application with POST requests.
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    // Keep going.
    next();
});

// Creating our Middleware that will read and convert our request's body to JSON.
app.use(bodyParser.json({limit: '10mb'}));

// Create the main middleware
app.post('', (req, res) => {
    res.status(200);
    res.send('We received your request.');
});

// Start to listen to the port.
app.listen(port, () => console.log(`Listening port ${port}`));