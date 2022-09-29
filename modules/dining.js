const axios = require('axios');
const e = require('cors');

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
    console.log('Dining Query:', req.query);
    const header = { Authorization: `Bearer ${process.env.YELP_KEY}` }
    const url = `https://api.yelp.com/v3/businesses/search?categories=restaurants&latitude=${req.query.lat}&longitude=${req.query.lon}`;
    const response = await axios.get(url, { headers: header });

    // const cacheRes = await Cache.match(req, res)
    // const response = cacheRes || (async () => {
    //   const axRes = await axios.get(url, { headers: header });
    //   Cache.put(req, axRes);
    //   return axRes;
    // })();

    // console.log(response);
    const data = response.data.businesses.slice(0,20);
    const restaurants = data.map(v => new Restaurant(v.id, v.name, v.rating, v.price, v.phone, v.image_url, v.url));
    
    // console.log(restaurants);
    res.send(restaurants);
  } catch (error) {
    console.log(`%cError with Dining Request`, {color: 'red', 'font-size': '1.5rem'});
    console.log(error.message);
  }
};
