// Loading our environment variables.
require('dotenv').config();
// Start the express
const express = require('express');
const app = express();
// get the port from environment variables
const port = process.env['PORT'] || 8080;
// Create the main middleware
app.get('', (req, res) => {
    res.status(200);
    res.send('Welcome');
});
// Start to listen to the port.
app.listen(port, () => console.log(`Listening port ${port}`));