const axios = require('axios');

class Forecast {
  constructor(date, h, l, desc, pop) {
    this.date = date;
    this.high = h;
    this.low = l;
    this.description = `${desc}, ${pop}% precipitation`;
  }
}




exports.get = async (req, res) => {
  try {
    console.log('Weather Query:', req.query);
    const key = process.env.WEATHERBIT_KEY;
    const response = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&lat=${req.query.lat}&lon=${req.query.lon}`);
    const data = response.data.data;
    const forecast = data.map(v => new Forecast(v.datetime.split('-').slice(1).join('/'), v.high_temp, v.low_temp, v.weather.description, v.pop));
    
    res.send(forecast);
  } catch (error) {
    console.log(`%cError with Weather Request`, {color: 'red', 'font-size': '1.5rem'});
    console.log(error.message);
  }
};
