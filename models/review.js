const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const ReviewSchema = Schema({
//     title: String,
//     description: String,
//     movieTitle: String
// });

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  movieId: { type: String, required: true}
});

// module.exports = mongoose.model('Review', ReviewSchema);
module.exports = Review
