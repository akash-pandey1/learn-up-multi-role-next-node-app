# Learn-Up 🎓

A full-stack learning platform built with Next.js, Node.js, Express, and MongoDB.

## 🚀 Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

## 📁 Project Structure

```
learn-up/
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── app/          # Next.js app router pages
│   │   │   ├── (auth)/   # Auth route group (login, signup, forgot-password)
│   │   │   └── ...
│   │   └── lib/          # API utilities and helpers
│   └── package.json
│
└── backend/               # Node.js/Express backend API
    ├── config/           # Database configuration
    ├── controllers/      # Route controllers
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    └── server.js         # Entry point
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/learnup
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   ```

   **For MongoDB Atlas:** Replace `MONGODB_URI` with your Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learnup?retryWrites=true&w=majority
   ```

4. **Start MongoDB (if using local):**
   - Windows: Start MongoDB service
   - Mac/Linux: `sudo systemctl start mongod` or `brew services start mongodb-community`

5. **Run the backend server:**
   ```bash
   npm run dev
   ```

   The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## 🎨 Color Palette

The application uses a custom color scheme:

- **Primary (Baby Pink)**: `#FFB6C1` - Buttons, error messages
- **Secondary (Lavender)**: `#CDB4DB` - Borders, links
- **Accent (Mint Green)**: `#A8E6CF` - Success states, hover effects
- **Highlight (Peach)**: `#FFD6A5` - Button hover states
- **Background (Cream)**: `#FFF6E5` - Page backgrounds
- **Text (Brown)**: `#5D4037` - All text content

## 📡 API Endpoints

### User Endpoints
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Course Endpoints
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/:id/enroll` - Enroll in course

### Health Check
- `GET /api/health` - Check API status

## 🔧 Development

### Running Both Servers

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 📝 Features

- ✅ User Authentication (Register/Login with JWT)
- ✅ Course Management (CRUD operations)
- ✅ Course Enrollment
- ✅ MongoDB Database Integration
- ✅ RESTful API Architecture
- ✅ TypeScript Support
- ✅ Modern UI with Tailwind CSS
- ✅ Responsive Design
- ✅ Custom Color Scheme

## 🗂️ Routes

### Frontend Routes
- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/forgot-password` - Password reset page

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in localStorage and automatically included in API requests.

## 📦 Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Backend Deployment
1. Set environment variables in your hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the application: `npm run build`
2. Set `NEXT_PUBLIC_API_URL` environment variable
3. Deploy to platforms like Vercel, Netlify, or any Node.js hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC

## 👤 Author

Learn-Up Development Team

---

**Happy Learning! 🎉**


