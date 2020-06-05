'use strict';

const { Router } = require('express');
const projectRouter = new Router();
const routeGuard = require('./../middleware/route-guard');

//LIST PROJECTS BY CATEGORY
projectRouter.get('/category/:name', (req, res, next) => {
  res.json({});
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
projectRouter.get('/create', (req, res, next) => {
  res.json({});
});

projectRouter.post('/create', (req, res, next) => {
  res.json({});
});

//CONTROBUTE PROJECT
projectRouter.get('/:projectId/contribute', (req, res, next) => {
  res.json({});
});

projectRouter.post('/:projectId/contribute', (req, res, next) => {
  res.json({});
});

module.exports = projectRouter;
