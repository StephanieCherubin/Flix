const express = require('express');
const router =  express.Router();

const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

module.exports = (app) => {
    // NEW
    app.get('/movies/:movieId/reviews/new', (req, res) => {
      Review.create({ movieId: req.params.movieId }).then((movie) => {
        console.log(movie);
        res.render('reviews-new', { movie, movieId: req.params.movieId});
      }).catch((err) => {
        console.log(err.message)
      })
    });

    // CREATE
    app.post('/movies/:movieId/reviews', (req, res) => {
      Review.create(req.body).then((review) => {
        res.redirect(`/movies/${review.movieId}`) // Redirect to reviews/:id
      }).catch((err) => {
        console.log(err.message)
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
    app.get('/reviews/:id/edit', (req, res) => {
      Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review});
      })
    })

    // UPDATE
    app.put('/reviews/:id', (req, res) => {
      Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
          res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
          console.log(err.message)
        })
    })

    // DELETE
    app.delete('/reviews/:id', function (req, res) {
      console.log("DELETE review")
      Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
      }).catch((err) => {
        console.log(err.message);
      })
    })

}