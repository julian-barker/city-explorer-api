const axios = require('axios');

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


const getMovies = async (req, res) => {
  console.log('Movies Query:', req.query);
  const query = req.query.query;
  const APIkey = process.env.TMDB_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${query}`;
  console.log(url);
  
  const key = `movies-${query}`;
  const cache = require('./cache.js').movies;
  // console.log(cache);

  try {
    let response;
    if(cache[key] && (Date.now() - cache[key].timestamp < cache.lifespan)) {
      console.log('Cache hit');
      response = cache[key];
      console.log('Movies Cache:', cache);
    } else {
      console.log('Cache miss');
      const APIresponse = await axios.get(url);
      // console.log(APIresponse.data);
      const movies = APIresponse.data.results.map(v => new Movie(v.id, v.title, v.vote_average, v.release_date, v.overview, `https://image.tmdb.org/t/p/original${v.poster_path}`));
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = movies;
      console.log('Cache Updated', cache);
      response = cache[key];
    }
    res.send(response);
  } catch (error) {
    res.send(error.message)
    console.log(`%cError with Movies Request`, {color: 'red', 'font-size': '1.5rem'});
    console.log(error.message);
  }
};

module.exports = getMovies;
