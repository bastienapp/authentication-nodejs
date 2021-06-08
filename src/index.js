const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authenticationRoute = require('./routes/authentication');

const app = express();

app.use(express.json());

// TODO: configure cors
app.use(cors());

// TODO: add your routes here
app.use('/auth', authenticationRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});
