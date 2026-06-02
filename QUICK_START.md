# Quick Start Guide - Syllabus Management System

## 🚀 How to Get Started

### Step 1: Start the Application

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:** (in another terminal)
```bash
npm install
npm run dev
```

### Step 2: Access the Login Page

Open your browser and go to: `http://localhost:5173/login`

### Step 3: Create Admin Account

1. Click on **"Register"** tab
2. Fill in the form:
   - **Name**: Admin User
   - **Email**: admin@easa.edu
   - **Username**: admin
   - **Password**: admin123 (at least 6 characters)
   - **Confirm Password**: admin123
   - **Role**: Select **"Admin"** from dropdown
   - **Phone**: +91-XXXXXXXXXX (optional)
3. Click **"Register"**
4. You'll see success message - Admin auto-approved!

### Step 4: Login as Admin

1. Click **"Login"** tab
2. Enter credentials:
   - **Username**: admin
   - **Password**: admin123
3. Click **"Login"**
4. You'll be redirected to **Admin Dashboard**

### Step 5: Test Other Roles (Optional)

**Create a Student Account:**
1. Go to `/login` (new browser tab or logout)
2. Click **"Register"**
3. Fill details:
   - **Name**: John Student
   - **Email**: student@easa.edu
   - **Username**: student1
   - **Role**: Student
   - **Student ID**: STU001
   - **Department**: Computer Science
   - **Password**: student123
4. Submit
5. You'll see: *"Registration successful! Please wait for admin approval..."*

**Approve the Student (as Admin):**
1. Go back to Admin Dashboard
2. Click **"Pending Approvals"** tab
3. Find the student registration
4. Click **"Approve"** button
5. Student can now login!

---

## 📊 Dashboard Overview

### Admin Dashboard
- **Pending Approvals Tab**: Review new user registrations
- **All Users Tab**: See all approved users
- **Manage Syllabus Tab**: Coming soon

### HOD Dashboard
- **Update Syllabus Tab**: Upload/manage syllabi
- **View Uploads Tab**: See submitted syllabi

### Staff Dashboard
- **My Courses Tab**: View assigned courses
- **Manage Resources Tab**: Upload materials
- **My Materials Tab**: View uploaded materials

### Student Dashboard
- **My Courses Tab**: View enrolled courses
- **Syllabi Tab**: Download syllabi
- **Materials Tab**: Download course materials

---

## 🔐 Test Credentials

After following the steps above:

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Student | student1 | student123 |

---

## 🔗 Important URLs

| Page | URL |
|------|-----|
| Login | http://localhost:5173/login |
| Dashboard | http://localhost:5173/dashboard |
| Home | http://localhost:5173/ |

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://easa-backend.onrender.com

Create a `.env` file in `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/easa
JWT_SECRET=your-secret-key-here
```

---

## 🆘 Troubleshooting

### "Cannot find module 'jsonwebtoken'"
```bash
cd backend
npm install jsonwebtoken
```

### "Port 5000 already in use"
```bash
# Change PORT in backend .env or:
PORT=5001 npm run dev
```

### "Login page not showing"
- Make sure frontend is running on port 5173
- Check if you're at http://localhost:5173/login
- Clear browser cache

### "Cannot login - connection error"
- Check if backend is running on port 5000
- Check CORS is enabled in backend
- Check JWT_SECRET is set

---

## 📝 Typical User Flow

### First Time Setup
1. Create Admin account ✅
2. Login as Admin ✅
3. Register Student/Staff/HOD ✅
4. Approve registrations as Admin ✅
5. Student/Staff/HOD login ✅
6. Access respective dashboards ✅

### Daily Usage

**As Admin:**
- Check pending approvals
- Approve/reject new users
- Manage syllabi

**As HOD:**
- Upload department syllabi
- View upload status
- Update materials

**As Staff:**
- Upload course materials
- Manage courses
- View materials

**As Student:**
- View syllabi
- Download materials
- Track courses

---

## 🎯 Key Features

✅ Four user roles (Admin, HOD, Staff, Student)
✅ Secure login/registration
✅ Admin approval workflow
✅ Role-based dashboards
✅ File management
✅ User management
✅ Responsive design
✅ Modern UI

---

## 📞 Support

For detailed API documentation, see: `SYLLABUS_SYSTEM_GUIDE.md`

For technical issues, check:
- Console logs (F12 → Console tab)
- Network tab for API calls
- Browser localStorage for tokens

---

## ✨ Next Features Coming Soon

- Email notifications
- Advanced file uploads
- Syllabus versioning
- Department reports
- Two-factor authentication

---

**Happy using! 🎉**
