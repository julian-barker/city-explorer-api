const axios = require('axios');

class Restaurant {
  constructor(id, name, rating, price, phone, imageUrl, link) {
    this.id = id;
    this.name = name;
    this.rating = rating;
    this.price = price;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.link = link;
  }
}

exports.get = async (req, res) => {
  try {
    const header = { Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}` }
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurants&latitude=${req.query.lat}&longitude=${req.query.lon}`, { headers: header });
    const data = response.data.businesses.slice(0,20);
    const restaurants = data.map(v => new Restaurant(v.id, v.name, v.rating, v.price, v.phone, v.image_url, v.url));
    console.log(restaurants);
    res.send(restaurants);
  } catch (error) {
    console.log(error);
  }
};
