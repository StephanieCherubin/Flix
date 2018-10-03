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

// SAME OUTCOME AS ABOVE
    app.get('/movies', (req, res) => {
            moviedb.miscNowPlayingMovies()
            .then(response => {
                res.render('movies-index', { movies: response.results });
            })
            .catch(console.error)
        });

// SHOW
    app.get('/movies/:id', (req, res) => {
      moviedb.movieInfo({ id: req.params.id }).then(movie => {
        moviedb.movieTrailers({ id: req.params.id }).then(videos => {
          movie.trailer_youtube_id = videos.youtube[0].source
          console.log('VIDEOS.TRAILER_YOUTUBE_ID', videos.trailer_youtube_id)
          renderTemplate(movie)
        });

        function renderTemplate(movie)  {
          res.render('movies-show', { movie: movie });
        }
      }).catch(console.error)
    });
}


