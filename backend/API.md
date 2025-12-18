# Learn-Up Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication via JWT token. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## Roles
- **parent** - Can manage kids, book programs
- **tutor** - Can create programs, manage batches
- **admin** - Full access

---

## User Endpoints

### Register User
```
POST /api/users/register
Body: {
  name: string,
  email: string,
  password: string,
  role: 'parent' | 'tutor' | 'admin',
  phone?: string
}
```

### Login
```
POST /api/users/login
Body: {
  email: string,
  password: string
}
```

### Get Current User
```
GET /api/users/me
Headers: Authorization: Bearer <token>
```

### Get All Users (Admin only)
```
GET /api/users
Headers: Authorization: Bearer <token>
```

---

## Student Endpoints (Kids)

### Add Student (Parent only)
```
POST /api/students
Headers: Authorization: Bearer <token>
Body: {
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  gender?: 'male' | 'female' | 'other',
  grade?: string,
  school?: string,
  allergies?: string[],
  emergencyContact?: {
    name: string,
    phone: string,
    relationship: string
  }
}
```

### Get Students (Parent only)
```
GET /api/students
Headers: Authorization: Bearer <token>
```

### Get Student by ID
```
GET /api/students/:id
Headers: Authorization: Bearer <token>
```

### Update Student (Parent only)
```
PUT /api/students/:id
Headers: Authorization: Bearer <token>
Body: { ...student fields }
```

### Delete Student (Parent only)
```
DELETE /api/students/:id
Headers: Authorization: Bearer <token>
```

---

## Program Endpoints

### Get All Programs (Public)
```
GET /api/programs?category=Music&ageMin=5&ageMax=10&locationType=online
Query Params: category, ageMin, ageMax, locationType, tutor, status, search
```

### Get Program by ID (Public)
```
GET /api/programs/:id
```

### Create Program (Tutor only)
```
POST /api/programs
Headers: Authorization: Bearer <token>
Body: {
  title: string,
  description: string,
  category: string,
  price: number,
  ageMin: number,
  ageMax: number,
  duration: number,
  maxStudents: number,
  locationType: 'online' | 'in_person' | 'both',
  ...
}
```

### Update Program (Tutor only - own programs)
```
PUT /api/programs/:id
Headers: Authorization: Bearer <token>
Body: { ...program fields }
```

### Delete Program (Tutor only - own programs)
```
DELETE /api/programs/:id
Headers: Authorization: Bearer <token>
```

---

## Batch Endpoints

### Get Batches by Program (Public)
```
GET /api/batches/program/:programId
```

### Get Batch by ID (Public)
```
GET /api/batches/:id
```

### Create Batch (Tutor only)
```
POST /api/batches
Headers: Authorization: Bearer <token>
Body: {
  program: ObjectId,
  name: string,
  startDate: Date,
  endDate: Date,
  days: ['monday', 'tuesday', ...],
  startTime: '09:00',
  endTime: '10:30',
  maxStudents: number
}
```

### Update Batch (Tutor only)
```
PUT /api/batches/:id
Headers: Authorization: Bearer <token>
Body: { ...batch fields }
```

---

## Booking Endpoints

### Create Booking (Parent only)
```
POST /api/bookings
Headers: Authorization: Bearer <token>
Body: {
  student: ObjectId,
  program: ObjectId,
  batch: ObjectId,
  amount: number
}
```

### Get Bookings
```
GET /api/bookings
Headers: Authorization: Bearer <token>
- Parents see their own bookings
- Tutors see bookings for their programs
- Admins see all bookings
```

### Get Booking by ID
```
GET /api/bookings/:id
Headers: Authorization: Bearer <token>
```

### Update Booking
```
PUT /api/bookings/:id
Headers: Authorization: Bearer <token>
Body: {
  status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled',
  paymentStatus?: 'pending' | 'completed' | 'failed' | 'refunded',
  ...
}
```

---

## Tutor Profile Endpoints

### Get All Tutor Profiles (Public)
```
GET /api/tutor-profiles?verified=true&specialization=Music&rating=4.0
```

### Get Tutor Profile (Public)
```
GET /api/tutor-profiles/:id
```

### Get My Tutor Profile (Tutor only)
```
GET /api/tutor-profiles/me/profile
Headers: Authorization: Bearer <token>
```

### Update Tutor Profile (Tutor only)
```
PUT /api/tutor-profiles/:id
Headers: Authorization: Bearer <token>
Body: {
  bio?: string,
  qualifications?: [...],
  specializations?: [...],
  hourlyRate?: number,
  ...
}
```

---

## Response Format

### Success
```json
{
  "data": {...}
}
```

### Error
```json
{
  "message": "Error message here"
}
```

