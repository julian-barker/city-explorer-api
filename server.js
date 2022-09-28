'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const weather = require('./modules/weather.js');
const movies = require('./modules/movies.js');
// const data = require('./data/weather.json');


// class Forecast {
//   constructor(date, h, l, desc, pop) {
//     this.date = date;
//     this.high = h;
//     this.low = l;
//     this.description = `${desc}, ${pop}% precipitation`;
//   }
// }

// class Movie {
//   constructor(id, title, rating, year, description, url) {
//     this.id = id;
//     this.title = title;
//     this.rating = rating;
//     this.year = year;
//     this.description = description;
//     this.posterUrl = url;
//   }
// }

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

app.get('/weather', weather.weather);

app.get('/movies', movies.movies);

app.get('*', (req, res) => { 
  res.status(404).send('Error: 404 - Page Not Found');
});
