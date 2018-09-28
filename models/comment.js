const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: String,
    description: String,
    movieTitle: String,
    movieId: { type: String, required: true}
});

module.exports = mongoose.model('Comment', CommentSchema);
