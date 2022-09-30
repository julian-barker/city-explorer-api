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

const getDining = async (req, res) => {
  console.log('Dining Query:', req.query);
  const { lat, lon } = req.query;
  const header = { Authorization: `Bearer ${process.env.YELP_KEY}` }
  const url = `https://api.yelp.com/v3/businesses/search?categories=restaurants&latitude=${lat}&longitude=${lon}`;
  
  const key = `dining-${lat}-${lon}`;
  const cache = require('./cache.js').dining;
  // console.log(cache);

  try {
    let response;
    if(cache[key] && (Date.now() - cache[key].timestamp < cache.lifespan)) {
      console.log('Cache hit');
      response = cache[key];
      console.log('Dining Cache:', cache);
    } else {
      console.log('Cache miss');
      const APIresponse = await axios.get(url, {headers: header});
      // console.log(APIresponse.data.businesses);
      const dining = APIresponse.data.businesses.map(v => new Restaurant(v.id, v.name, v.rating, v.price, v.display_phone, v.image_url, v.url));
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = dining;
      console.log('Updated: ', cache);
      response = cache[key];
    }
    res.send(response);
  } catch (error) {
    res.status(error.status).send(error.message)
    console.log(`%cError with Dining Request`, {color: 'red', 'font-size': '1.5rem'});
    console.log(error.message);
  }
};

module.exports = getDining;
