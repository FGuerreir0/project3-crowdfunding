'use strict';

const { Router } = require('express');
const router = new Router();
const PaymentContribution = require('./../models/paymentContribution');

// Stripe configuration

const stripe = require('stripe')(process.env.STRIPE_API_SECRET_KEY);
/*
router.post('/', (req, res, next) => {
  const { userId, supporting, amount, creditCardToken } = req.body;
  console.log(req.body);
  let paymentIntent;

  stripeInstance.paymentIntents
    .create({
      amount: amount,
      currency: 'eur',
      payment_method_types: ['card']
    })
    .then((response) => {
      console.log('CHECK THIS CONSOLE LOG', response);
      paymentIntent = response.id;
      return stripeInstance.customers.create({
        customer: userId,
        payment_method: creditCardToken
      });
    })
    

  stripeInstance.customers
    .create({
      customer: userId,
      payment_method: creditCardToken
    })
    .then((document) => {
      return stripeInstance.paymentMethods.attach(creditCardToken, {
        customer: document.id
      });
    })
    .then((customer) => {
      console.log('estou aqui');
      return stripeInstance.charges.create({
        amount: amount,
        currency: 'eur',
        customer: customer.customer,
        payment_intent: paymentIntent,
        payment_method: creditCardToken,
        error_on_requires_action: true,
        confirm: true,
        save_payment_method: true
      });
    })
    .then((paymentProcess) => {
      console.log('Estou no processo de pagamento');
      if (paymentProcess.status !== 'succeeded') {
        return Promise.reject(new Error('Charge could not be made.'));
      } else {
        return PaymentContribution.create({
          contribution: amount,
          payment: paymentProcess.id,
          user: userId,
          supporting
        });
      }
    })
    .then((contribution) => {
      res.json({ contribution: contribution });
    })
    .catch((error) => {
      console.log(error);
    });
*/

//------------------------------------------------------------------------
/*ANOTHER EXAMPLE

router.post('/', (req, res, next) => {
  const { userId, supporting, amount, creditCardToken } = req.body;
  console.log(req.body);
  let customer;

  stripeInstance.customers
    .create()
    .then((document) => {
      console.log(document);
      customer = document;
      return stripeInstance.paymentMethods.attach(creditCardToken, {
        customer: customer.id,
      });
    })
    .then((method) => {
      console.log('estou aqui', customer);
      return stripeInstance.paymentIntents.create({
        customer: customer.id,
        payment_method: creditCardToken,
        amount: amount,
        currency: 'eur',
        error_on_requires_action: true,
        confirm: true,
        save_payment_method: true,
      });
    })
    .then((paymentProcess) => {
      console.log('Estou no processo de pagamento');
      if (paymentProcess.status !== 'succeeded') {
        return Promise.reject(new Error('Charge could not be made.'));
      } else {
        return PaymentContribution.create({
          contribution: amount,
          payment: paymentProcess.id,
          user: userId,
          supporting,
        });
      }
    })
    .then((contribution) => {
      res.json({ contribution: contribution });
    })
    .catch((error) => {
      console.log(error);
    });
});*/

router.post('/', (req, res, next) => {
  const { userId, supporting, amount, creditCardToken } = req.body;
  console.log(req.body);
  console.log(userId);
});

module.exports = router;
