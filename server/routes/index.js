'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const Projects = require('./../models/project');

router.get('/', (req, res, next) => {
  Projects.find()
    .then((result) => {
      res.json({
        projects: result
      });
    })
    .catch((error) => {
      next(error);
    });
});

//WELCOME PAGE
router.get('/welcome', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = router;
