const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Subscription = require('../models/Subscription');
const auth = require('../middleware/auth');

// Get subscription plans
router.get('/plans', async (req, res) => {
  try {
    const plans = [
      {
        id: 'starter',
        name: 'Starter',
        price: 29,
        description: 'Perfect for individuals',
        features: ['Basic AI Agent', '5 videos/month', '100 API calls/day'],
      },
      {
        id: 'professional',
        name: 'Professional',
        price: 79,
        description: 'For growing teams',
        features: ['Advanced AI Agent', '50 videos/month', '1000 API calls/day', 'Priority support'],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 199,
        description: 'Custom solutions',
        features: ['Full AI Agent', 'Unlimited videos', 'Unlimited API calls', '24/7 support'],
      },
    ];

    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create subscription
router.post('/create', auth, async (req, res) => {
  try {
    const { planId, paymentMethodId } = req.body;

    if (!planId || !paymentMethodId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create Stripe customer
    const customer = await stripe.customers.create({
      metadata: { userId: req.user.id },
    });

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // Set as default
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Get price from Stripe products (or use fallback)
    const priceMap = {
      starter: process.env.STRIPE_PRICE_STARTER,
      professional: process.env.STRIPE_PRICE_PROFESSIONAL,
      enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
    };

    const priceId = priceMap[planId];
    if (!priceId) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
    });

    // Save to database
    const newSubscription = new Subscription({
      userId: req.user.id,
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      planId,
      status: subscription.status,
    });

    await newSubscription.save();

    res.status(201).json({
      message: '✅ Subscription created',
      subscription: newSubscription,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel subscription
router.post('/cancel', auth, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.user.id });

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    const canceledSubscription = await stripe.subscriptions.del(
      subscription.stripeSubscriptionId
    );

    subscription.status = 'canceled';
    await subscription.save();

    res.json({
      message: '✅ Subscription canceled',
      subscription: subscription,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
