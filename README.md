# Explore Lanka — Tourism Website

A full-stack tourism website for Sri Lanka featuring AI-powered travel planning, location discovery, and user authentication.

## 📋 Project Overview

**Explore Lanka** is a comprehensive tourism platform that combines:
- **Locations Directory**: Browse and discover tourist destinations in Sri Lanka
- **AI Travel Planner**: Generate personalized itineraries using Google Gemini AI
- **User Authentication**: Secure login/registration system with JWT tokens
- **Admin Dashboard**: Manage locations and site content
- **Responsive Design**: Mobile-friendly interface built with React


#Test

## 🏗️ Architecture

The project is organized into three main components:

### 1. **Backend** (Node.js + Express)
Located in `/backend/`

**Core Features:**
- **Authentication**: JWT-based user authentication with secure password hashing
- **API Endpoints**:
  - `/api/auth/` — User registration, login, logout
  - `/api/locations/` — Browse and fetch location details
  - `/api/travel-plan/` — AI-powered itinerary generation with Gemini
- **Database**: MongoDB with Mongoose models for Users, Locations, and Travel Plans
- **Middleware**: Authentication, error handling, input validation/sanitization
- **Testing**: Backend API tests with Jest and Supertest
- **Environment Variables**: Sensitive data management (API keys, DB connection strings)

**Structure:**
```
backend/
├── config/        # Database and environment configuration
├── controllers/   # Business logic for routes
├── middleware/    # Auth, validation, error handling
├── models/        # MongoDB schemas (User, Location, TravelPlan)
├── routes/        # API route definitions
├── utils/         # Helper functions (Gemini client, token generation)
├── tests/         # Automated test suite
├── server.js      # Express app entry point
├── createAdmin.js # Admin user initialization script
└── package.json   # Dependencies and scripts
```

### 2. **Frontend** (React + Vite)
Located in `/frontend/`

**Core Features:**
- **Pages**:
  - Home page with featured locations
  - Locations browse page with filtering
  - Location detail pages
  - Travel Planner form and results
  - User Dashboard
  - Admin Dashboard
  - Authentication pages (Login, Register, Logout)
- **Components**: Reusable UI components (NavBar, LocationCard, Skeleton loaders, etc.)
- **State Management**: React Context API for authentication and admin auth
- **Styling**: Responsive CSS with optimized images
- **Testing**: Validation helper tests

**Structure:**
```
frontend/
├── src/
│   ├── components/    # Reusable React components
│   ├── context/       # Auth context (User & Admin)
│   ├── pages/         # Page components
│   ├── utils/         # Helpers and validation logic
│   ├── App.jsx        # Main component
│   └── main.jsx       # React entry point
├── public/            # Static assets (fonts, images)
├── vite.config.js     # Vite configuration
├── eslint.config.js   # Code quality rules
└── package.json       # Dependencies and scripts
```

### 3. **Infrastructure** (DevOps)
Located in `/infra/`

**Deployment Tools:**
- **Terraform** (`infra/terraform/`) — Infrastructure as Code
  - EC2 instance provisioning
  - Security groups configuration
  - AWS provider setup
- **Ansible** (`infra/ansible/`) — Configuration management
  - Automated server setup
  - Nginx reverse proxy configuration
  - Application deployment playbook

**Docker Support:**
- `docker-compose.yml` — Development environment
- `docker-compose.prod.yml` — Production environment
- Individual Dockerfiles for backend and frontend

## 🚀 Features

### AI Travel Planner
- **Smart Itinerary Generation**: Uses Google Gemini API to create personalized travel plans
- **Validated Input**: Client-side form validation + server-side sanitization
- **Comprehensive Plans**: Daily itineraries, estimated costs, accommodations, transport, packing lists
- **Loading States**: Graceful UX with loading indicators and retry functionality
- **Endpoint**: `POST /api/travel-plan/`

### User Management
- **Registration & Login**: Secure JWT-based authentication
- **Protected Routes**: Role-based access (User/Admin)
- **Admin Features**: Content management and site administration

### Location Management
- **Browse Locations**: Browse all tourist destinations
- **Location Details**: Detailed information about each location
- **Admin Controls**: Add, edit, delete locations

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React, Vite, JavaScript/JSX, CSS3 |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **AI** | Google Gemini API |
| **Auth** | JWT (JSON Web Tokens), bcrypt |
| **Containerization** | Docker, Docker Compose |
| **Infrastructure** | AWS (Terraform), Nginx (Ansible) |
| **Testing** | Jest, Supertest (Backend); Vitest (Frontend) |

## 📦 Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- Google Gemini API key
- Docker & Docker Compose (optional)

### Local Development

**Backend Setup:**
```bash
cd backend
npm install
# Create .env file with:
# GEMINI_API_KEY=your_api_key
# MONGODB_URI=your_mongodb_connection
# NODE_ENV=development
npm run server
```

**Frontend Setup:**
```bash
cd frontend
npm install
# Optionally set VITE_API_URL in .env (defaults to http://localhost:5000)
npm run dev
```

**With Docker Compose:**
```bash
# Set environment variables
$env:GEMINI_API_KEY = 'your_api_key'
$env:MONGODB_URI = 'your_mongodb_connection'

# Start services
docker compose up --build
```

### Production Deployment

**Environment Variables** (never commit secrets):
- **Backend**: `GEMINI_API_KEY`, `MONGODB_URI`, `NODE_ENV`
- **Frontend**: `VITE_API_URL`

**Deployment Platforms:**
- **Docker**: Use `docker-compose.prod.yml` with environment variables
- **AWS**: Use Terraform (infra/terraform/) + Ansible (infra/ansible/) for automated deployment
- **Vercel/Netlify**: Set environment variables in platform settings
- **Heroku**: Use `heroku config:set` for environment variables
- **Kubernetes**: Use Secrets for sensitive data

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🧪 Testing

**Backend Tests:**
```bash
cd backend
npm test
```

**Frontend Tests:**
```bash
cd frontend
npm run test
```

## 📄 Project Files

- **README.md** — This file
- **DEPLOYMENT.md** — Detailed deployment guide
- **Jenkinsfile** — CI/CD pipeline configuration
- **docker-compose.yml** — Development Docker setup
- **docker-compose.prod.yml** — Production Docker setup

## 🔐 Security Notes

- API keys and sensitive credentials are stored in environment variables
- `.env` files are excluded from git (see `.gitignore`)
- Password hashing uses bcrypt with salt rounds
- JWT tokens for stateless authentication
- Input validation and sanitization on all endpoints
- CORS and security headers configured in Express

## 📝 API Documentation

### Travel Plan Endpoint
- **Route**: `POST /api/travel-plan/`
- **Auth**: Required (JWT token)
- **Body**: `{ duration, interests, budget, startDate }`
- **Response**: Formatted itinerary with daily plans, costs, and recommendations

### Authentication Endpoints
- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — User login
- `POST /api/auth/logout` — User logout

### Location Endpoints
- `GET /api/locations/` — Get all locations
- `GET /api/locations/:id` — Get location details
- `POST /api/locations/` — Create location (Admin)
- `PUT /api/locations/:id` — Update location (Admin)
- `DELETE /api/locations/:id` — Delete location (Admin)

## 📞 Support & Documentation

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

For CI/CD pipeline setup, see [Jenkinsfile](Jenkinsfile).

## 📝 License

This project is part of the Explore Lanka tourism initiative.
