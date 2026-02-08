# Candidate Referral Management System

A full-stack web application to manage candidate referrals, built with React and Node.js/Express.

## Features Implemented

### Frontend (React)
- **Dashboard** - View all referred candidates with real-time updates
- **Referral Form** - Submit new candidates with name, email, phone, job title, and resume (PDF)
- **Search & Filter** - Filter candidates by name, job title, or status
- **Status Management** - Update candidate status via dropdown (Pending → Reviewed → Hired)
- **Metrics Dashboard** - View stats: Total referrals, Pending, Reviewed, Hired
- **Authentication** - Login/Logout with JWT tokens

### Backend (Node.js + Express)
- **RESTful API** with full CRUD operations
- **JWT Authentication** - Secure endpoints with token-based auth
- **MongoDB** - NoSQL database with Mongoose ODM
- **Validation** - Email format, phone number (10 digits), PDF-only uploads
- **Error Handling** - Centralized error middleware with proper HTTP status codes
- **Resume Upload** - PDF files stored as Base64 in MongoDB (2MB max)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| File Upload | Multer |

## Project Structure

```
Referral-Management-System/
├── client/                 # React frontend
│   └── src/
│       ├── api/            # API service functions
│       ├── components/     # Reusable UI components
│       ├── hooks/          # Custom React hooks
│       ├── pages/          # Page components
│       ├── styles/         # CSS files
│       └── utils/          # Utility functions
├── server/                 # Express backend
│   └── src/
│       ├── config/         # Database configuration
│       ├── controllers/    # Route handlers
│       ├── middleware/     # Auth, error, upload middleware
│       ├── models/         # Mongoose schemas
│       └── routes/         # API routes
└── README.md
```

## Steps to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/krishx06/Referral-Management-System.git
cd Referral-Management-System
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/referral-system
JWT_SECRET=your_jwt_secret_key
```

Start the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../client
npm install
npm run dev
```

### 4. Access the Application

#### Test Credentials (For Evaluation)

Use the following credentials to log in and test the application:

Email: krish@test.com  
Password: password123

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user|
| POST | `/api/auth/login` | Login user |

### Candidates (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/candidates` | Get all candidates |
| POST | `/api/candidates` | Create new candidate |
| PUT | `/api/candidates/:id/status` | Update candidate status |
| DELETE | `/api/candidates/:id` | Delete candidate |
| GET | `/api/candidates/:id/resume` | Download candidate resume |
| GET | `/api/candidates/metrics` | Get dashboard metrics |

## Assumptions & Limitations

### Assumptions
1. Each user can only view/manage their own referred candidates
2. Phone numbers are validated to ensure they contain exactly 10 numeric digits.
3. Only PDF files are accepted for resume uploads
4. Candidate status follows the flow: Pending → Reviewed → Hired

### Limitations
1. **Resume Storage** - Resumes are stored as Base64 in MongoDB (max 2MB per file). For larger files, consider cloud storage (Cloudinary/S3).
2. **No Password Reset** - Password recovery feature not implemented
3. **No Pagination** - All candidates loaded at once (may affect performance with large datasets)
4. **Single User Session** - No multi-device session management

## License

This project is for educational purposes.

---

**Built by [Krish Patil](https://github.com/krishx06)**
