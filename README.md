# 📚 Library Management System
<br>A full-stack Library Management System designed to manage books, users, and library staff efficiently. This system provides authentication, CRUD operations for books and profiles, and secure access based on <br>user roles.
<br>
## 🚀 Tech Stack
- **Frontend**: EJS Templates, Bootstrap, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer

## 🔑 Features
- Login & Register with JWT-based authentication
- Role-based access control (Admin, Librarian, etc.)
- Add, delete, and view books
- Manage user and librarian profiles
- Upload images/files using Multer
- Clean UI built with Bootstrap and EJS

## 🛠️ Setup Instructions
1. **Clone the repository**:
 https://github.com/aishanya20/LibraryManagementSyestem.git
 cd library-management-system
2.**Install dependencies:**
npm install
3.**Configure environment variables**
   Create a .env file in the root with:
   DB_URI=mongodb+srv://aashh297:0BsTdDjn2xmtStB8@blog.1d67mvl.mongodb.net/blog
   SECRET_KEY=mySuperSecretKey123
4.**Create uploads folder**
   This folder is used to store uploaded images of book covers. It should be created and used to upload the book cover in the project.
   mkdir uploads
5.**Start the application**
   npm run dev
6.**Visit in browser**
   http://localhost:3000

#📂 Project Structure

├── models/
│   ├── book.js
│   └── profile.js
|   └── user.js
├── routes/
│   └── routes.js
|   └── userRoutes.js
├── middleware/
│   └── auth.js
├── views/
│   ├── Layout/
│   │   ├── footer.ejs
│   │   ├── header.ejs
│   ├── add_book.ejs
│   ├── chck.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── user_profile.ejs
├── uploads
│   
│   
├── main.js   

👩‍💻 Author
Your Name – @aishanya20

















