# Mock API Server

A simple Node.js Express mock API server with body-parser and CORS support.

## Features

- Express.js server
- CORS enabled for all routes
- Body parser for JSON and URL-encoded data
- Mock endpoints for users and posts
- Full CRUD operations
- Error handling

## Installation

```bash
cd server
npm install
```

## Running the Server

### Development mode (with nodemon):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### Health Check

- `GET /api/health` - Check server status

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/users/:id/posts` - Get posts by user ID

## Example Requests

### Get all users:

```bash
curl http://localhost:3000/api/users
```

### Create a new user:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "New User", "email": "newuser@example.com", "age": 28}'
```

### Create a new post:

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "New Post", "content": "This is a new post", "userId": 1}'
```

## Default Data

The server comes with sample users and posts data that you can modify in `server.js`.
