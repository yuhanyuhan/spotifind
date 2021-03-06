require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const connectDb = require('./db');
const Dog = require('./models/Dog');

app.use(express.json());
app.use(cors());
connectDb;

app.get('/dogs', (req, res) => {
  Dog.find({}, function(err, dogs) {
    res.send(dogs);
  });
});

app.use(express.static(path.join(__dirname, 'client/build')));

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
