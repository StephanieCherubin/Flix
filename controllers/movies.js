const express = require('express');
const router = express.Router();
const app = express()
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('82726f7e5a0d46689161e30a12e353c0')
const Review = require('../models/review.js');
function movies(app){

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
        console.log(movie)
        res.render('movies-show', { movie: movie });
    }).catch(console.error)
    })
}

app.get('/movies/:id', (req, res) => {
  moviedb.movieInfo({ id: req.params.id }).then(movie => {
    if (movie.video) {
      moviedb.movieVideos({ id: req.params.id }).then(videos => {
        movie.trailer_youtube_id = videos.results[0].key
        renderTemplate(movie)
      })
    } else {
      renderTemplate(movie)
    }

    function renderTemplate(movie)  {
      res.render('movies-show', { movie: movie });
    }

  }).catch(console.error)
})

module.exports = movies;