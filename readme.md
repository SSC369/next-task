Hosted Application URL = https://next-task-three.vercel.app

Here's a `README.md` file for your To-Do application:

````markdown
# Full-Stack To-Do Application

This is a full-stack To-Do application built using MongoDB, Express.js, Node.js, and Next.js. The application allows users to register, log in, and manage their tasks with features such as adding, updating, deleting, and marking tasks as completed. The application also supports task filtering and pagination.

## Features

### User Authentication

- User registration and login
- JWT-based authentication

### Task Management

- Add a new task with a title and description
- Edit the title and description of a task
- Delete a task
- Mark a task as completed

### Task List

- Display a list of tasks with filtering by completed and pending tasks
- Pagination for the task list

### Responsive Design

- The application is responsive and works well on both desktop and mobile devices

## Technical Requirements

### Backend

- Node.js and Express.js server
- RESTful APIs for task management (CRUD operations)
- User authentication with JWT
- MongoDB as the database
- Mongoose for database operations

### Frontend

- Next.js for the front-end application
- Pages for user registration, login, and task management interface
- React hooks for state management
- CSS modules or styled-components for styling
- Client-side and server-side rendering as needed

## Setup and Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/todo-app.git
```
````

2. Navigate to the backend directory and install dependencies:

```sh
cd backend
npm install
```

3. Set up environment variables for the backend. Create a `.env` file in the `backend` directory and add the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend server:

```sh
npm start
```

5. Navigate to the frontend directory and install dependencies:

```sh
cd ../frontend
npm install
```

6. Start the frontend server:

```sh
npm run dev
```

## Demo

A live demo of the application is available at: https://next-task-three.vercel.app

## License

This project is licensed under the MIT License.

```

Replace `your-username` with your GitHub username and `your_mongodb_connection_string` and `your_jwt_secret` with your actual MongoDB connection string and JWT secret. Add the demo URL and screenshots/video links as needed.
```
