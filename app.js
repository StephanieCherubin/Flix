const express = require('express')
const app = express()
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// let reviews = [
//   { title: "Great Review" },
//   { title: "Next Review" }
// ]

app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

// Mongoose Connection
const mongoUri =
   process.env.MONGODB_URI || "mongodb://localhost:27017/RottenPotatoes";
mongoose.connect(
   mongoUri,
   { useNewUrlParser: true }
);

const Review = mongoose.model('Review', {
  title: String
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

