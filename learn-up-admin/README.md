# Learn-Up Admin Dashboard

Admin dashboard for managing the Learn-Up platform.

## Features

- 🔐 Admin-only authentication
- 📊 Dashboard with statistics
- 👥 User management (view, edit, delete)
- 📚 Programs management (view, edit status, delete)
- 📁 Categories management (CRUD)
- 🏷️ Tags management (CRUD)

## Setup

1. **Install dependencies:**
   ```bash
   cd admin/learn-up-admin
   npm install
   ```

2. **Create environment file:**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

   The admin dashboard will be available at `http://localhost:3001` (or next available port)

## Login

Use an admin account to login:
- Email: (any user with role='admin')
- Password: (user's password)

## Pages

- `/login` - Admin login page
- `/dashboard` - Main dashboard with statistics
- `/dashboard/users` - Manage users
- `/dashboard/programs` - Manage programs
- `/dashboard/categories` - Manage categories
- `/dashboard/tags` - Manage tags

## Tech Stack

- Next.js 16
- React 19
- Material-UI (MUI)
- TypeScript
