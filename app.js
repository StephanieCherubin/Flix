const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

const reviewController = require('./controllers/reviews.js')
const ReviewSchema = require('./models/review.js');
const CommentSchema = require('./models/comment.js');
const commentController = require('./controllers/comments.js');
require('./controllers/movies.js')(app);
require('./controllers/reviews.js')(app);

const port = process.env.PORT || 3000;

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// routes
// app.use(commentController);
// app.use('/', reviewController);
// app.use(movieController);

// movies(app);

// Mongoose Connection
const mongoUri =
   process.env.MONGODB_URI || "mongodb://localhost:27017/RottenPotatoes";

mongoose.connect( mongoUri, { useNewUrlParser: true });

app.listen(port, () => {
  console.log(`App listening on ${port}`)
});

// module.exports = app;
