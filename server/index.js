// Loading our environment variables.
require('dotenv').config();

// Start the express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fr = require('./FacialRecognition');

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
    // Detect the faces.
    fr.recognizeFaces(req.body.image).then( data => {
        // Send the response.
        res.status(200);
        res.send(data);
    }).catch( err => {
        console.log(err);
        // Send a internal error.
        res.status(500);
        res.send();
    });
});

// Start to listen to the port.
app.listen(port, () => console.log(`Listening port ${port}`));