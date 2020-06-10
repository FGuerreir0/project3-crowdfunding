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
  const id = req.params.projectId;
  Project.findById(id)
    .populate('creator')
    .then((result) => {
      res.json({ project: result });
    })
    .catch((err) => {
      next(err);
    });
});

//PROJECT EDIT

projectRouter.post('/:projectId/edit', uploader.single('coverPictureUrl'), (req, res, next) => {
  const id = req.params.projectId;
  const { title, location, shortDescription } = req.body;
  let coverPictureUrl;
  if (req.file) coverPictureUrl = req.file.path;

  if (coverPictureUrl) {
    Project.findByIdAndUpdate({ _id: id }, { title, location, shortDescription, coverPictureUrl })
      .then((result) => {
        result.title = title;
        result.coverPictureUrl = coverPictureUrl;
        result.shortDescription = shortDescription;
        result.location = location;
        res.json({ project: result });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    Project.findByIdAndUpdate({ _id: id }, { title, location, shortDescription })
      .then((result) => {
        result.title = title;
        result.shortDescription = shortDescription;
        result.location = location;
        res.json({ project: result });
      })
      .catch((error) => {
        next(error);
      });
  }
});
//CREATE PROJECT

projectRouter.post('/create', uploader.single('coverPictureUrl'), (req, res, next) => {
  console.log(req.user._id);
  const { title, description, category, location, money, resources, volunteer } = req.body;

  let coverPictureUrl;
  if (req.file) coverPictureUrl = req.file.path;

  Project.create({
    title,
    creator: req.user._id,
    shortDescription: description,
    category,
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
