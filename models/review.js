const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

const ReviewSchema = Schema({
    title: String,
    description: String,
    movieTitle: String
});

module.exports = mongoose.model('Review', ReviewSchema);