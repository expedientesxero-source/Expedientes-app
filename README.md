# 🚀 Expedientes SaaS - AI-Powered Content Platform

## Overview

Expedientes is a **Software-as-a-Service (SaaS)** platform that combines:

- 🤖 **AI Agent** (TalleVar IA) - Intelligent automation for content creation
- 🎥 **Video Generation** - Create videos with AI avatars
- 💳 **Stripe Integration** - Flexible subscription billing
- 📱 **Multi-platform** - Web, Mobile, and Desktop support

## 📋 Project Structure

```
Expedientes-app/
├── packages/
│   ├── backend/          # Node.js/Express API
│   ├── frontend/         # Next.js Web Application
│   └── mobile/           # React Native/Flutter (placeholder)
├── package.json          # Monorepo root
└── README.md
```

## 🔧 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Auth**: JWT
- **Payments**: Stripe
- **Password**: bcryptjs

### Frontend
- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Payments**: @stripe/react-stripe-js
- **State**: Zustand
- **HTTP**: Axios

### Mobile
- **Placeholder**: Ready for React Native or Flutter

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 16
Yarn or npm
MongoDB (local or Atlas)
Stripe Account
```

### Installation

```bash
# Clone the repository
git clone https://github.com/expedientesxero-source/Expedientes-app.git
cd Expedientes-app

# Install dependencies
yarn install

# Setup environment variables
cp packages/backend/.env.example packages/backend/.env.local
cp packages/frontend/.env.local.example packages/frontend/.env.local

# Edit .env files with your Stripe keys
```

### Running Locally

```bash
# Start all services (backend + frontend)
yarn dev

# Or run individually:
yarn workspace @expedientes/backend dev
yarn workspace @expedientes/frontend dev
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Subscriptions
- `GET /api/subscriptions/plans` - Get available plans
- `POST /api/subscriptions/create` - Create subscription
- `POST /api/subscriptions/cancel` - Cancel subscription

### Payments
- `POST /api/payments/create-payment-intent` - Create payment
- `POST /api/payments/webhook` - Stripe webhook

### AI Agent
- `POST /api/ai-agent/generate-content` - Generate content with AI
- `POST /api/ai-agent/create-video` - Create video
- `GET /api/ai-agent/videos/:videoId` - Get video status

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

## 💳 Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the dashboard
3. Create subscription products:
   - **Starter**: $29/month
   - **Professional**: $79/month
   - **Enterprise**: $199/month
4. Copy the Price IDs and add to `.env`
5. Set up webhook endpoint: `http://localhost:3001/api/payments/webhook`

## 🔐 Environment Variables

### Backend (.env.local)
```
MONGODB_URI=mongodb://...
JWT_SECRET=your-secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PROFESSIONAL=price_...
STRIPE_PRICE_ENTERPRISE=price_...
OPENAI_API_KEY=sk_...
```

### Frontend (.env.local)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📚 Features

### ✅ Implemented
- [x] User authentication (register/login)
- [x] Subscription management
- [x] Stripe payment integration
- [x] User profile management
- [x] AI Agent routes (placeholder)
- [x] Video creation routes (placeholder)

### 🔄 In Progress
- [ ] Complete AI Agent integration
- [ ] Video generation backend
- [ ] Mobile app development
- [ ] Admin dashboard

## 🐛 Issues & Tracking

See GitHub Issues for current development:
- Issue #1: Agente administrador
- Issue #5: TalleVar IA integration
- Issues #3, #4, #6, #7: Video creation features

## 📝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📄 License

Apache License 2.0

## 📞 Support

For issues and questions:
- GitHub Issues: https://github.com/expedientesxero-source/Expedientes-app/issues
- Email: support@expedientes.app

## 🎯 Roadmap

- **Phase 1** (Current): SaaS foundation + Stripe integration
- **Phase 2**: AI Agent full implementation
- **Phase 3**: Mobile app launch
- **Phase 4**: Enterprise features

---

**Made with ❤️ by Expedientes Team**
