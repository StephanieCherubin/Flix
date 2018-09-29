const express = require('express');
// const router = express.Router();
const app = express();
const Review = require('../models/review.js')
const Comment = require('../models/comment.js');

module.exports = (app) => {
      // NEW comment
    app.post('movies/:movieId/reviews/:id/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
          res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
          console.log(err.message);
        });
    });

        // DELETE comment
    app.delete('movies/:movieId/reviews/:reviewId/comments/:id', function (req, res) {
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
          res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
          console.log(err.message);
        })
    })

    // CREATE Comment
    app.post('/reviews/comments', (req, res) => {
      Comment.create(req.body).then(comment => {
        res.status(200).send({ comment: comment });
      }).catch((err) => {
        res.status(400).send({ err: err })
      })
    })

    // DELETE
    app.delete('/reviews/comments/:id', function (req, res) {
      console.log("DELETE comment")
      Comment.findByIdAndRemove(req.params.id).then(comment => {
        res.status(200).send(comment);
      }).catch((err) => {
        console.log(err.message);
        res.status(400).send(err)
      })
    })
}

module.exports = app;
