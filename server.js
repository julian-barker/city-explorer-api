'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const weather = require('./modules/weather.js');
const movies = require('./modules/movies.js');
const dining = require('./modules/dining.js');


//Start the server
const app = express();

// Middleware
app.use(cors());

// Declare Port variable
const PORT = process.env.PORT || 3001;

// Listening for connection
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

// Endpoints
app.get('/', (req, res) => {
  res.send('Hello from the home route!');
});

app.get('/weather', weather.get);

app.get('/movies', movies.get);

app.get('/dining', dining.get);

app.get('*', (req, res) => { 
  res.status(404).send('Error: 404 - Page Not Found');
});
