// Loading our environment variables.
require('dotenv').config();

// Testing if they were loaded.
console.log('PORT = '+process.env['PORT']);
console.log('IAM_APIKEY = '+process.env['IAM_APIKEY']);