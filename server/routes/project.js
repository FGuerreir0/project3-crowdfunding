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

//SEARCH FEATURE
projectRouter.get('/search', (req, res, next) => {
  const { term } = req.query;
  console.log(term);
  // Alternative way without having to enforce a text index for property name
  // Restaurant.find({ name: { $regex: term, $options: 'i' } })
  Project.find({
    // $text isn't highly sensitive to short search terms
    $text: {
      $search: term,
      $language: 'none'
    }
  })
    .then((projects) => {
      console.log(projects);
      res.json({
        projects
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
  const { title, location, shortDescription, category, money, resources, volunteer } = req.body;
  let coverPictureUrl;
  if (req.file) coverPictureUrl = req.file.path;

  Project.findById(id)
    .then((project) => {
      project.title = title;
      if (coverPictureUrl) project.coverPictureUrl = coverPictureUrl;
      project.shortDescription = shortDescription;
      project.category = category;
      project.location = location;
      project.needs.money.total = money;
      project.needs.resources = JSON.parse(resources);
      project.needs.volunteer = JSON.parse(volunteer);
      return project.save();
    })
    .then((result) => {
      res.json({ project: result });
    })
    .catch((error) => {
      next(error);
    });
});
//CREATE PROJECT

projectRouter.post('/create', uploader.single('coverPictureUrl'), (req, res, next) => {
  //console.log(req.user._id);
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
        total: money * 100
      },
      resources: JSON.parse(resources),
      volunteer: JSON.parse(volunteer)
    },
    coverPictureUrl
  })
    .then((result) => {
      //console.log('obj create: ', result);
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

//PROJECT DELETE

projectRouter.get('/:projectId/delete', (req, res, next) => {
  const id = req.params.projectId;
  Project.findByIdAndDelete(id)
    .then((result) => {
      res.json({});
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = projectRouter;
