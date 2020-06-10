'use strict';

const { Router } = require('express');
const router = new Router();
const PaymentContribution = require('./../models/paymentContribution');

// Stripe configuration

const stripe = require('stripe');
const stripeInstance = stripe(process.env.STRIPE_API_SECRET_KEY);

router.post('/', (req, res, next) => {
  const { userId, supporting, amount, creditCardToken } = req.body;
  res.json({});
});

module.exports = router;
