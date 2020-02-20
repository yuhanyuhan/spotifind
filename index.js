require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dogsRouter = require('./routes/dogs');
const usersRouter = require('./routes/users');
const connectDb = require('./db');

const corsOptions = {
  credentials: true,
  allowedHeaders: "content-type",
  origin: "http://localhost:3001",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/', dogsRouter);
app.use('/', usersRouter);

connectDb;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/public/index.html'));
  })
}

app.listen(port, () => console.log(`Listening on port ${port}...`));

// Create new dog
// const createDog = async dog => {
//   try {
//     const newDog = new Dog(dog);
//     await newDog.save();
//   } catch (err) {
//     handleError(err);
//   }
// };
// createDog({
//   name: "",
//   gender: "",
//   description: "",
//   hdbApproved: false,
//   available: true
// });
