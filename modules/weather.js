const axios = require('axios');

class Forecast {
  constructor(date, h, l, desc, pop) {
    this.date = date;
    this.high = h;
    this.low = l;
    this.description = `${desc}, ${pop}% precipitation`;
  }
}

exports.weather = async (req, res) => {
  const query = req.query;
  const weatherKey = process.env.REACT_APP_WEATHERBIT_KEY;
  const weatherResponse = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lat=${query.lat}&lon=${query.lon}`);
  const w = weatherResponse.data.data;
  const forecast = w.map(v => new Forecast(v.datetime.split('-').slice(1).join('/'), v.high_temp, v.low_temp, v.weather.description, v.pop));
  // console.log(weatherResponse, w, forecast);
  res.send(forecast);
};
