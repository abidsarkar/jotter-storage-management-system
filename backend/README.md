# Jotter Storage Management System - Backend

This is the backend of the **Jotter Storage Management System**, a MERN stack-based web application that allows users to manage their files, folders, and storage efficiently. The backend is built using **Node.js, Express, MongoDB**, and follows the **MVC design pattern**.

## 🚀 Features
- User Authentication (Google Sign-In, Email/Password Sign-Up, JWT Authentication)
- Email Verification via 6-digit Code
- Password Reset Functionality
- File & Folder Management (CRUD Operations)
- File Uploads using Multer (Supports Images & PDFs)
- Favorite & Calendar-wise File Selection
- Secure Cookie-based Authentication

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT, Google OAuth, bcrypt
- **File Uploads:** Multer
- **Database ODM:** Mongoose
- **Environment Variables:** dotenv

---

## 📌 Installation & Setup
### 1️⃣ Clone the repository
```bash
git clone https://github.com/abidsarkar/jotter-storage-management-system.git
cd backend
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Create a `.env` file
Create a `.env` file in the root directory and add the following environment variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER= your google client email
EMAIL_PASS= your email pass given by google console
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
NODE_ENV=production
BASE_URL= http://localhost:5173
SESSION_SECRET=your session secret
```
### 4️⃣ Start the server with node
```bash
npm start
```
### 4️⃣ Start the server with nodemon
```bash
npm run dev
```
The server will run at `http://localhost:5000`.

---

## 🔑 API Endpoints

### 🟢 Authentication Routes
| Method | Endpoint | Description |jwt token|
|--------|---------|-------------|------|
| `POST` | `/api/auth/register` | Register a new user |No|
| `POST` | `/api/auth/verify-email` | Verify email with OTP |No|
| `POST` | `/api/auth/login` | Login with email/password |No|
| `POST` | `/api/auth/request-reset` | Request Reset Password for forget password |No|
| `POST` | `/api/auth/verify-otp` | verify otp for forgot password |No|
| `POST` | `/api/auth/reset-password` | Reset user password |
| `POST` | `/api/auth/change-password` | Change Password for login user |YES|

### 📂 Profile Information Management Routes
| Method | Endpoint | Description |JWT|
|--------|---------|-------------|----|
| `GET` | `/api/auth/profile` | User Profile information|YES|
| `DELETE` | `/api/profile/delete-account` | Delete an User Profile|YES|
| `PUT` | `/api/profile/edit-profile` | Edit Profile User Name|YES|
### 📂 File Management Routes
| Method | Endpoint | Description |JWT|
|--------|---------|-------------|----|
| `POST` | `/api/files/upload` | Upload a file |YES|
| `GET` | `/api/files/all` | Get All Files |YES|
| `GET` | `/api/files/recent` | Get Resect upload file |YES|
| `GET` | `/api/files/date/:date` | Get files uploaded on a specific date |YES|
| `GET` | `/api/files/single/:fileid` | Get a single file |YES|
| `DELETE` | `/api/files/:fileid` | Delete a file |YES|
| `PUT` | `/api/files/rename/:fileid` | Rename a file |YES|

### 📂 Get File Routes
| Method | Endpoint | Description |JWT|
|--------|---------|-------------|----|
| `PUT` | `/api/files/images` | Get All Image of user |YES|
| `PUT` | `/api/files/pdfs` | Get All PDF of user |YES|
| `PUT` | `/api/files/notes` | Get All PDF of user |YES|

### 📁 Folder Management Routes
| Method | Endpoint | Description |JWT|
|--------|---------|-------------|----|
| `POST` | `/api/files/create-folder` | Create a folder |YES|
| `GET` | `/api/files/folders` | Get all folders of user|YES|
| `DELETE` | `/api/files/:folderID` | Delete a folder |
### 📁 Memory use Management Routes
| Method | Endpoint | Description |JWT|
|--------|---------|-------------|----|
| `GET` | `/api/files/getTotalUsagesStorageCount` | Get user Storage use|YES|
| `GET` | `/api/files/totalFile` | Get user total files and folder Count in number|YES|
### 📁 Search and favorite Management Routes
| Method | Endpoint | Description |JWT|
|--------|---------|-------------|----|
| `GET` | `/api/favorite/date/2025-3-23` | Search file created by date|YES|
| `GET` | `/api/favorite/toggleFavorite/:fileid` | Make file favorite|YES|
| `GET` | `/api/favorite/allFavorites` | get  favorite file|YES|
---
## For google login
```bash
cd frontend
npm run dev
```

## 🔥 Contribution
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Added a new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

---

## ⚡ License
This project is **open-source** and available under the [MIT License](LICENSE).

---

## ✨ Contact
For any queries, reach out to **abidsrkar0@gmail.com** or visited on **[portfolio](https://www.abidsarkar100.xyz/)**.

Happy Coding! 🚀

