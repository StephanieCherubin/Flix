const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('82726f7e5a0d46689161e30a12e353c0')

module.exports = (app) => {
    // NEW review template
    app.get('/movies/:movieId/reviews/new', (req, res) => {
      Review.create({ movieId: req.params.movieId }).then((movie) => {
        res.render('reviews-new', { movieId: req.params.movieId});
      }).catch((err) => {
        console.log(err.message)
      })
    });

    // CREATE saves review in db
    app.post('/movies/:movieId/reviews', (req, res) => {
      Review.create(req.body).then((review) => {
        res.redirect(`/movies/${review.movieId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })

    // SHOW
    app.get('/movies/:movieId/reviews/:id', (req, res) => {
      // find review
      Review.findById(req.params.id).then(review => {
        // fetch its comments
        Comment.find({ reviewId: req.params.id }).then(comments => {
          // respond with the template with both values
          res.render('reviews-show', { review: review, comments: comments })
        })
      }).catch((err) => {
        // catch errors
        console.log(err.message)
      });
    });

    // EDIT
    app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
      Review.findById(req.params.id, (err, review) => {
        res.render('reviews-edit', {review: review });
      }).catch(err => { console.log(err) });
    });


    // UPDATE
    app.put('/movies/:movieId/reviews/:id', (req, res) => {
      Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
          res.redirect(`/movies/:movieId/reviews/${review._id}`)
        })
        .catch(err => {
          console.log(err.message)
        })
    })

    // DELETE
    app.delete('/movies/:movieId/reviews/:id', function (req, res) {
        console.log(req.params.id)
      Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect(`/movies/:movieId/reviews/${review._id}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })
}