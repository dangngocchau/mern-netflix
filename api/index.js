const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const moviesRoute = require('./routes/movies');
const listsRoute = require('./routes/lists');
const app = express();

dotenv.config();

const DB = process.env.MONGO_URL.replace(
  '<PASSWORD>',
  process.env.MONGO_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfull'))
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', moviesRoute);
app.use('/api/lists', listsRoute);

app.listen(8800, () => {
  console.log('Running');
});
