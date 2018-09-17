const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('your api key')

app.get('/', (req, res) => {
  moviedb.miscNowPlayingMovies().then(response => {
    res.render('movies-index', { movies: response.results });
  }).catch(console.error)
})

// SHOW
app.get('/movies/:id', (req, res) => {
    moviedb.movieInfo({ id: req.params.id }).then(movie => {
        res.render('movies-show', { movie: movie });
    }).catch(console.error)
})