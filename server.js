'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
// const data = require('./data/weather.json');


class Forecast {
  constructor(date, h, l, desc) {
    this.date = date;
    this.high = h;
    this.low = l;
    this.description = desc;
  }
}

class Movie {
  constructor(id, title, rating, year, description, url) {
    this.id = id;
    this.title = title;
    this.rating = rating;
    this.year = year;
    this.description = description;
    this.posterUrl = url;
  }
}

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

app.get('/weather', async (req, res) => {
  const query = req.query;
  const weatherKey = process.env.REACT_APP_WEATHERBIT_KEY;
  const weatherResponse = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lat=${query.lat}&lon=${query.lon}`);
  const w = weatherResponse.data.data;
  const forecast = w.map(v => new Forecast(v.datetime.split('-').slice(1).join('/'), v.high_temp, v.low_temp, v.weather.description));
  console.log(weatherResponse, w, forecast);
  res.send(forecast);
});

app.get('/movies', async (req, res) => {
  const query = req.query.query;
  const movieKey = process.env.REACT_APP_TMDB_KEY;
  const movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${query}`);
  const m = movieResponse.data.results;
  const movies = m.map(v => new Movie(v.id, v.title, v.vote_average, v.release_date.split('-')[0], v.overview, `https://image.tmdb.org/t/p/w200${v.poster_path}`))
  console.log(movieResponse, m, movies);
  res.send(movies);
});

app.get('*', (req, res) => { 
  res.status(404).send('Error: 404 - Page Not Found');
});
