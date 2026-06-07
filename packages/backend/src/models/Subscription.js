const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    planId: {
      type: String,
      enum: ['starter', 'professional', 'enterprise'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'canceled', 'past_due'],
      default: 'active',
    },
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
