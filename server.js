'use strict';


require('dotenv').config();

const express = require('express');
const cors = require('cors');
const data = require('./data/weather.json');


class Forecast {
  constructor(date, h, l) {
    this.description = `Low of ${l}, high of ${h} with broken clouds`;
    this.date = date;
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

app.get('/weather', (req, res) => {
  const query = req.query.searchQuery;
  const weatherData = data.find(v => v.city_name === query );
  res.send(weatherData.data.map(v => new Forecast(v.datetime, v.high_temp, v.low_temp)));
});

app.get('*', (req, res) => { 
  res.status(404).send('Error: 404 - Page Not Found');
});
