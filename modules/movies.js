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

exports.get = async (req, res) => {
  try {
    const key = process.env.REACT_APP_TMDB_KEY;
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${req.query.query}`);
    const data = response.data.results;
    const movies = data.map(v => new Movie(v.id, v.title, v.vote_average, v.release_date.split('-')[0], v.overview, `https://image.tmdb.org/t/p/w200${v.poster_path}`))
    // console.log(movieResponse, m, movies);
    res.send(movies);
  } catch (error) {
    console.log(error);
  }
};