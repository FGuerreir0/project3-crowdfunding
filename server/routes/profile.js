'use strict';

const { Router } = require('express');
const profileRouter = new Router();
const routeGuard = require('./../middleware/route-guard');

const User = require('./../models/user');
const Project = require('./../models/project');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'project3',
  },
});
const uploader = multer({ storage });

//DON'T FORGET TO CONFIGURE MULTER AND CLOUDINARY

//SINGLE VIEW
profileRouter.get('/:id', (req, res, next) => {
  let _user;
  let _projects;
  User.findById(req.params.id)
    .then((result) => {
      _user = result;
      return Project.find({ creator: req.params.id });
    })
    .then((projects) => {
      _projects = projects;
      return Project.find({ 'backers.userId': req.params.id });
    })
    .then((_actions) => {
      res.json({ user: _user, projects: _projects, actions: _actions });
    })
    .catch((error) => {
      next(error);
    });
});

// EDIT USER PROFILE

profileRouter.post('/:userId/edit', uploader.single('pictureUrl'), (req, res, next) => {
  const id = req.params.userId;
  const { username, location, bio } = req.body;
  let pictureUrl;
  if (req.file) pictureUrl = req.file.path;

  if (pictureUrl) {
    User.findByIdAndUpdate({ _id: id }, { username, location, bio, pictureUrl })
      .then((result) => {
        result.username = username;
        result.pictureUrl = pictureUrl;
        result.bio = bio;
        result.location = location;
        res.json({ user: result });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    User.findByIdAndUpdate({ _id: id }, { username, location, bio })
      .then((result) => {
        result.username = username;
        result.bio = bio;
        result.location = location;
        res.json({ user: result });
      })
      .catch((error) => {
        next(error);
      });
  }
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
