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
 cd library-management-system<br>
2. <b>Install dependencies:</b><br>
npm install<br>
3. **Configure environment variables**<br>
   Create a .env file in the root with:<br>
   DB_URI<br>
   SECRET_KEY<br>
4.**Create uploads folder**<br>
   This folder is used to store uploaded images of book covers. It should be created and used to upload the book cover in the project.<br>
   mkdir uploads<br>
5.**Start the application**<br>
   npm run dev<br>
6.**Visit in browser**<br>
   http://localhost:3000<br>

#📂 Project Structure

├── models/<br>
│   ├── book.js<br>
│   └── profile.js<br>
|   └── user.js<br>
├── routes/<br>
│   └── routes.js<br>
|   └── userRoutes.js<br>
├── middleware/<br>
│   └── auth.js<br>
├── views/<br>
│   ├── Layout/<br>
│   │   ├── footer.ejs<br>
│   │   ├── header.ejs<br>
│   ├── add_book.ejs<br>
│   ├── chck.ejs<br>
│   ├── index.ejs<br>
│   ├── login.ejs<br>
│   ├── register.ejs<br>
│   ├── user_profile.ejs<br>
├── uploads<br>   
├── main.js   <br>

👩‍💻 Author
Your Name – @aishanya20

















