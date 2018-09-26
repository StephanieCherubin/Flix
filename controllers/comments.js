const express = require('express');
// const router = express.Router();
const app = express();
const Review = require('../models/review.js')
const Comment = require('../models/comment.js');

module.exports = (app) => {
      // new comment
    app.post('movies/:movieId/reviews/:id/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
          res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
          console.log(err.message);
        });
    });

    app.delete('movies/:movieId/reviews/:reviewId/comments/:id', function (req, res) {
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
          res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
          console.log(err.message);
        })
    })

}

module.exports = app;
