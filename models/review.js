const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    title: String,
    description: String,
    movieTitle: String,
    movieId: { type: String, required: true}
});

module.exports = mongoose.model('Review', ReviewSchema);
