const axios = require('axios');

class Forecast {
  constructor(date, h, l, desc, pop) {
    this.date = date;
    this.high = h;
    this.low = l;
    this.description = `${desc}, ${pop}% precipitation`;
  }
}

const getWeather = async (req, res) => {
  console.log('Weather Query:', req.query);
  const { lat, lon } = req.query;
  const APIkey = process.env.WEATHERBIT_KEY;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${APIkey}&lat=${lat}&lon=${lon}`;
  
  const key = `weather-${lat}-${lon}`;
  const cache = require('./cache.js').weather;
  // console.log(cache);

  try {
    let response;
    if(cache[key] && (Date.now() - cache[key].timestamp < cache.lifespan)) {
      console.log('Cache hit');
      response = cache[key];
      console.log('Weather Cache:', cache);
    } else {
      console.log('Cache miss');
      const APIresponse = await axios.get(url);
      const forecast = APIresponse.data.data.map(v => new Forecast(v.datetime, v.high_temp, v.low_temp, v.weather.description, v.pop));
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = forecast;
      console.log('Updated: ', cache);
      response = cache[key];
    }
    res.send(response);
  } catch (error) {
    res.status(error.status).send(error.message)
    console.log(`%cError with Weather Request`, {color: 'red', 'font-size': '1.5rem'});
    console.log(error.message);
  }
};

module.exports = getWeather;
