# BlogSpace – Full Stack Blog Management System

BlogSpace is a full-stack blogging application that allows users to create, publish, manage, and explore blog posts. It provides a user-friendly interface with secure authentication and a personalized dashboard.

## Features

### User Authentication
- User registration and login.
- Secure password hashing using bcrypt.
- JWT-based authentication.
- Protected dashboard and API routes.
- Logout functionality.

### Blog Management
- Create new blog posts.
- Edit existing blog posts.
- Delete blog posts.
- Save posts as drafts or publish them.
- Manage blogs from a personalized dashboard.

### Dashboard
- View total blogs, published blogs, and drafts.
- Display only the logged-in user's blogs.
- View profile information, including name and email.
- Secure ownership checks for editing and deleting blogs.

### Public Blog Experience
- Browse published blog posts.
- View individual blog details.
- Search blogs by title and content.
- Filter blogs by category.

## Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Authentication & Security**
- JSON Web Tokens (JWT)
- bcryptjs
- Protected API routes
- User-based blog ownership authorization

## Project Structure

```text
BlogSpace/
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Blog.js
│   ├── routes/
│   │   └── auth.js
│   ├── server.js
│   └── .env
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── create-blog.html
└── blog-details.html
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Muhammad-Nabi016/BlogSpace-Authentication-Dashboard
cd BlogSpace
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend folder and configure:

- Your MongoDB connection string using the environment variable expected by `server.js`.
- `JWT_SECRET` with a strong, random secret.
- `PORT` if your backend uses a configurable port.

Never commit your actual `.env` file or expose database credentials and JWT secrets.

### 4. Start the Backend

```bash
node server.js
```

The backend runs at:

```text
http://localhost:5000
```

### 5. Run the Frontend

Open `index.html` using the VS Code Live Server extension or another local static web server.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/blogs` | Get public blogs |
| GET | `/api/blogs/:id` | Get blog details |
| GET | `/api/blogs/my-blogs` | Get logged-in user's blogs |
| POST | `/api/blogs` | Create a blog |
| PUT | `/api/blogs/:id` | Update an owned blog |
| DELETE | `/api/blogs/:id` | Delete an owned blog |

Protected endpoints require a valid JWT Bearer token.

## Security

- Passwords are hashed before being stored.
- JWT tokens are used to authenticate protected requests.
- Users can manage only their own blog posts.
- Unauthorized requests are rejected by authentication middleware.
- Blog ownership is checked during update and delete operations.

## Learning Outcomes

Through this project, I gained practical experience in:

- Full-stack web development.
- REST API development using Express.js.
- MongoDB database integration.
- JWT authentication and authorization.
- Secure password handling.
- Frontend and backend integration.
- CRUD operations and user-specific data management.

## Acknowledgement

Developed as part of my Full Stack Web Development internship at **Codomax Digital Solutions**.

---

**BlogSpace – Write, Share, and Explore Stories.**

## Author

**Muhammad Nabi**

GitHub: https://github.com/Muhammad-Nabi016

LinkedIn:https://www.linkedin.com/in/muhammad-nabi-aa053636b?utm_source=share_via&utm_content=profile&utm_medium=member_android