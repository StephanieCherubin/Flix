const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Review = require('./models/review.js');

//FIXME: phyllis changed variable names, go update where you use them
const reviewController = require('./controllers/reviews.js')
const commentController = require('./controllers/comments.js');
const CommentSchema = require('./models/comment');
const movieController = require('./controllers/movies.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(commentController);
app.use(reviewController);


// INDEX
// app.get('/', (req, res) => {
//   res.render('movies-index');
// })

Movie(app);




// Mongoose Connection
const mongoUri =
   process.env.MONGODB_URI || "mongodb://localhost:27017/RottenPotatoes";
mongoose.connect(
   mongoUri,
   { useNewUrlParser: true }
);

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`App listening on ${port}`)
})

module.exports = app;
