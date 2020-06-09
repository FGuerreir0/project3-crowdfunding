'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {});

//WELCOME PAGE
router.get('/welcome', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = router;
