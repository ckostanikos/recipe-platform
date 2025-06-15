# 🍽️ Little Chefs - Recipe Platform

A full-stack, database-driven web application for sharing, discovering, and managing recipes. Built as part of the coursework for *CCS6215 - Web Technologies*.

## 📚 Overview

Little Chefs is a social recipe platform that allows users to:
- Create accounts and manage personal profiles
- Upload and display recipes with ingredients, instructions, and photos
- Browse and comment on others' recipes
- View public profiles of other users
- Securely log in and maintain session continuity

## 💡 Features

### 👤 User Management
- **Register** with full name, email, password, and profile picture (JPG/PNG, <1MB)
- **Login/Logout** functionality with session handling
- **Update or delete** profile securely

### 📖 Recipe Management
- **Upload recipes** with images, ingredients, and instructions
- **Dynamic ingredients input** with add/remove support
- **View all recipes** on a public main page
- **Click-through to detailed recipe view**
- **Comment system** for each recipe

### 🔒 Access Control
- Only registered users can access most features
- Session-based authentication
- Redirects users to login page when not authenticated

### 🌐 Public Profiles
- View any user’s public profile via `publicprofile.html`
- Show uploaded recipes and profile details

### 💬 Comments
- Commenting on recipes is restricted to logged-in users
- Comments are stored and displayed per recipe

## 🧰 Tech Stack

| Layer         | Technology                          |
|---------------|--------------------------------------|
| Frontend      | HTML5, CSS3 (Bootstrap 5), JavaScript |
| Backend       | Node.js, Express.js                  |
| Database      | MySQL (Relational DBMS)              |
| File Handling | Multer (Image upload)                |
| Authentication| Sessions (express-session)           |


```
recipe-platform/
│
├── frontend/           # HTML, CSS, and JavaScript files (vanilla)
├── backend/            # Node.js backend with Express.js
├── database/           # SQL scripts for MySQL setup
├── .env                # Environment variables
├── package.json        # Project dependencies
└── README.md
```




## 🧪 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/ckostanikos/recipe-platform.git
cd recipe-platform
```
### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory and add the following:

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=recipe_platform
SESSION_SECRET=your_session_secret
```

### 4. Set Up the Database

Import the SQL file into MySQL or create the database and tables inside VSCode (using schema.sql and mysql -u root -p in terminal):

```sql
SOURCE database/init.sql;
```

### 5. Start the Backend Server

```bash
npm run dev
```

The server runs at `http://localhost:4016`.

## 🌐 Frontend Setup

### 1. Open Frontend with Live Server

- Install the **Live Server** extension in VS Code.
- Open the `frontend/` folder.
- Right-click on `login.html` or `mainPage.html` → **Open with Live Server**

### 2. Set Live Server to Use `localhost` Instead of `127.0.0.1`

In VS Code, go to Settings (`Ctrl + ,`) → open `settings.json` and add:

```json
"liveServer.settings.host": "localhost"
```

## 🔧 Scripts

| Command         | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Run backend server using nodemon |
| `npm install`  | Install backend dependencies    |

## 💡 Future Enhancements

- Add recipe likes & comments
- Advanced search with filters (e.g. time, difficulty)
- Pagination on recipe list
- Admin dashboard
- Email verification & password reset
- Responsive mobile layout

## 🧑‍💻 Authors

Built by **Christos Kostanikos** and **Maria Patsianotaki** for the CCS6215 Web Technologies course project.

## 📜 License

MIT License
