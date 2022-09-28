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

exports.movies = async (req, res) => {
  const query = req.query.query;
  const movieKey = process.env.REACT_APP_TMDB_KEY;
  const movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${query}`);
  const m = movieResponse.data.results;
  const movies = m.map(v => new Movie(v.id, v.title, v.vote_average, v.release_date.split('-')[0], v.overview, `https://image.tmdb.org/t/p/w200${v.poster_path}`))
  // console.log(movieResponse, m, movies);
  res.send(movies);
};
