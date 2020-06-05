'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const router = new Router();

router.post('/register', (req, res, next) => {
  const { username, email, password } = req.body;

  console.log('Estou na route authentication');

  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        username,
        email,
        passwordHash: hash
      });
    })
    .then((user) => {
      req.session.user = user._id;
      res.json({ user: user });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/login', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then((result) => {
      if (result) {
        req.session.user = user._id;
        res.json({ user });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

module.exports = router;
