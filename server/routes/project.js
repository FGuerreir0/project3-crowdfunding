'use strict';

const { Router } = require('express');
const projectRouter = new Router();
const routeGuard = require('./../middleware/route-guard');
const Project = require('./../models/project');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'project3'
  }
});
const uploader = multer({ storage });

//LIST ALL PROJECTS
projectRouter.get('/list', (req, res, next) => {
  Project.find()
    .populate('creator')
    .sort({ createdDate: -1 })
    .then((result) => {
      res.json({
        projects: result
      });
    })
    .catch((error) => {
      next(error);
    });
});

//SINGLE VIEW
projectRouter.get('/:projectId', (req, res, next) => {
  res.json({});
});

//PROJECT EDIT
projectRouter.get('/:projectId/edit', (req, res, next) => {
  res.json({});
});

projectRouter.post('/:projectId/edit', (req, res, next) => {
  res.json({});
});

//CREATE PROJECT

projectRouter.post('/create', uploader.single('coverPictureUrl'), (req, res, next) => {
  console.log(req.user._id);
  const { title, description, location, money, resources, volunteer } = req.body;

  let coverPictureUrl;
  if (req.file) coverPictureUrl = req.file.path;

  Project.create({
    title,
    creator: req.user._id,
    shortDescription: description,
    location,
    needs: {
      money: {
        total: money
      },
      resources: JSON.parse(resources),
      volunteer: JSON.parse(volunteer)
    },
    coverPictureUrl
  })
    .then((result) => {
      console.log('obj create: ', result);
      res.json({});
    })
    .catch((err) => {
      next(err);
    });
});

//CONTRiBUTE PROJECT
projectRouter.get('/:projectId/contribute', (req, res, next) => {
  res.json({});
});

projectRouter.post('/:projectId/contribute', (req, res, next) => {
  res.json({});
});

module.exports = projectRouter;
