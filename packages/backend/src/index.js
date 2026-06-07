const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const subscriptionRoutes = require('./routes/subscriptions');
const userRoutes = require('./routes/users');
const aiAgentRoutes = require('./routes/aiAgent');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expedientes-app')
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ Database error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai-agent', aiAgentRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ Backend is running', timestamp: new Date() });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

module.exports = app;
