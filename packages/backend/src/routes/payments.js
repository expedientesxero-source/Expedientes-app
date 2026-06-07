const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Subscription = require('../models/Subscription');
const auth = require('../middleware/auth');

// Create Payment Intent
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: { userId: req.user.id, ...metadata },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook: Handle payment success
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const { metadata } = event.data.object;
      console.log('✅ Payment succeeded for user:', metadata.userId);
      // Update subscription status here
    }

    if (event.type === 'customer.subscription.updated') {
      const { customer, status } = event.data.object;
      console.log('✅ Subscription updated:', { customer, status });
    }

    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
