const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('82726f7e5a0d46689161e30a12e353c0')
const Review = require('../models/review.js');

module.exports = (app) => {

// INDEX
    app.get('/', (req, res) => {
      moviedb.miscNowPlayingMovies().then(response => {
          console.log(response.results)
          console.log(response)
        res.render('movies-index', { movies: response.results });
      }).catch(console.error)
    })

// SHOW
    app.get('/movies/:id', (req, res) => {
      moviedb.movieInfo({ id: req.params.id }).then(movie => {
        Review.find({ movieId: req.params.id }).then(reviews => {
          res.render('movies-show', { movie: movie, reviews: reviews });
        })
      }).catch(console.error)
    })
}
