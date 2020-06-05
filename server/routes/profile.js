'use strict';

const { Router } = require('express');
const profileRouter = new Router();
const routeGuard = require('./../middleware/route-guard');

//SINGLE VIEW
profileRouter.get('/user/:userId', (req, res, next) => {
  res.json({});
});

// EDIT USER PROFILE

profileRouter.get('/user/:userId/edit', (req, res, next) => {
  res.json({});
});

profileRouter.post('/user/:userId/edit', (req, res, next) => {
  res.json({});
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
