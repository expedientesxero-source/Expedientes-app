# 📦 Complete Installation Guide

## Step 1: Prerequisites

```bash
# Check Node.js version (need >= 16)
node --version

# Check npm/yarn
npm --version
# or
yarn --version
```

## Step 2: Clone & Install

```bash
git clone https://github.com/expedientesxero-source/Expedientes-app.git
cd Expedientes-app

# Install all dependencies
yarn install
# or
npm install
```

## Step 3: Setup Environment Variables

### Backend Setup
```bash
cp packages/backend/.env.example packages/backend/.env.local
```

Edit `packages/backend/.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expedientes-app
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-key-here
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PROFESSIONAL=price_...
STRIPE_PRICE_ENTERPRISE=price_...
OPENAI_API_KEY=sk_...
```

### Frontend Setup
```bash
cp packages/frontend/.env.local.example packages/frontend/.env.local
```

Edit `packages/frontend/.env.local`:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Step 4: Database Setup

### Option A: MongoDB Atlas (Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Add to `.env.local`

### Option B: Local MongoDB
```bash
# Install MongoDB or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Step 5: Stripe Setup

1. Create account at https://stripe.com
2. Go to Dashboard → API Keys
3. Copy Secret Key and Publishable Key
4. Create subscription prices:
   - **Starter**: Product "Expedientes Starter" → Price $29/month
   - **Professional**: Product "Expedientes Professional" → Price $79/month
   - **Enterprise**: Product "Expedientes Enterprise" → Price $199/month
5. Copy Price IDs to `.env`
6. Set up webhook: https://dashboard.stripe.com/webhooks
   - Endpoint: `http://localhost:3001/api/payments/webhook`
   - Events: `payment_intent.succeeded`, `customer.subscription.updated`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## Step 6: Run the Application

```bash
# Terminal 1: Run everything together
yarn dev

# Terminal 2 (alternative): Run separately
# Backend
yarn workspace @expedientes/backend dev
# Frontend (in another terminal)
yarn workspace @expedientes/frontend dev
```

## Step 7: Verify Installation

- Backend API: http://localhost:3001/api/health
- Frontend: http://localhost:3000
- Check console for "✅ Backend running" message

## 🎯 Test the Flow

1. **Register**: http://localhost:3000/register
2. **Login**: http://localhost:3000/login
3. **View Plans**: http://localhost:3000/pricing
4. **Subscribe**: Click any plan
5. **Test Card**: Use Stripe test card `4242 4242 4242 4242`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### MongoDB Connection Error
```bash
# Check connection string
# Make sure IP is whitelisted in MongoDB Atlas
```

### Stripe Errors
```bash
# Verify webhook is receiving events
# Check Stripe dashboard → Events
# Ensure webhook secret is correct
```

### CORS Issues
```bash
# Make sure frontend API_URL matches backend port
# Check CORS middleware in backend
```

## 📚 Next Steps

1. Implement AI Agent endpoints
2. Add video generation
3. Create admin dashboard
4. Build mobile app
5. Deploy to production

## 🚀 Deployment

### Backend (Vercel/Heroku)
```bash
# Deploy to Vercel
vercel deploy
```

### Frontend (Vercel)
```bash
# Auto-deployed from GitHub
```

### Database (MongoDB Atlas)
- Already hosted
- Update connection string in production `.env`

---

**Need help?** Check the README.md or open an issue!
