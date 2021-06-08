const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/mysql');

const router = express.Router();

router.post('/signup', (request, response) => {
  const { email, password, firstname, lastname } = request.body;
  // falsy : null, undefined, 0, false, ""
  if (!email || !password) {
    response.status(403).send('Email or password missing');
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        response.status(500).send(err);
      } else {
        pool.query(
          'INSERT INTO user (email, password, firstname, lastname) VALUES (?, ?, ?, ?)',
          [email, hash, firstname, lastname],
          (error, results) => {
            if (error) {
              response.status(500).send(error);
            } else {
              response.status(201).send({
                id: results.insertId,
                ...request.body,
                password: 'hidden',
              });
            }
          }
        );
      }
    });
  }
});

module.exports = router;
