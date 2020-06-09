'use strict';

const { Router } = require('express');
const profileRouter = new Router();
const routeGuard = require('./../middleware/route-guard');

const User = require('./../models/user');

//DON'T FORGET TO CONFIGURE MULTER AND CLOUDINARY

//SINGLE VIEW
profileRouter.get('/:id', (req, res, next) => {
  User.find({ _id: req.params.id })
    .then((result) => {
      res.json({ user: result });
    })
    .catch((error) => {
      next(error);
    });
});

// EDIT USER PROFILE

profileRouter.post('/:userId/edit', (req, res, next) => {
  const id = req.params.userId;
  const { username, location, bio } = req.body;
  console.log(username, location, bio);
  User.findByIdAndUpdate({ _id: id }, { username, location, bio })
    .then((result) => {
      console.log(result);
      res.json({ user: result });
    })
    .catch((error) => {
      next(error);
    });
});

//LIST USER SUPPORTED ACTIONS
profileRouter.get('/user/:userId/actions', (req, res, next) => {
  res.json({});
});

profileRouter.post('/user/:userId/actions', (req, res, next) => {
  res.json({});
});

// LIST USER PROJECTS
profileRouter.get('/user/:userId/projects', (req, res, next) => {
  res.json({});
});

profileRouter.post('/user/:userId/projects', (req, res, next) => {
  res.json({});
});

module.exports = profileRouter;
