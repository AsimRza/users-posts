const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock data
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35 },
];

let posts = [
  { id: 1, title: "First Post", content: "This is the first post", userId: 1 },
  {
    id: 2,
    title: "Second Post",
    content: "This is the second post",
    userId: 2,
  },
  { id: 3, title: "Third Post", content: "This is the third post", userId: 1 },
];

// Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running!" });
});

// Users endpoints
app.get("/api/users", (req, res) => {
  setTimeout(() => {
    res.json(users);
  }, 2000);
});

app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  setTimeout(() => {
    res.json(user);
  }, 2000);
});

app.post("/api/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    age: age || null,
  };

  users.push(newUser);
  setTimeout(() => {
    res.status(201).json(newUser);
  }, 2000);
});

app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, email, age } = req.body;
  users[userIndex] = { ...users[userIndex], name, email, age };

  res.json(users[userIndex]);
});

app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    setTimeout(() => {
      return res.status(404).json({ error: "User not found" });
    }, 2000);
    return;
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  setTimeout(() => {
    res.json({ message: "User deleted", user: deletedUser });
  }, 2000);
});

// Posts endpoints
app.get("/api/posts", (req, res) => {
  setTimeout(() => {
    res.json(posts);
  }, 2000);
});

app.get("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
});

app.post("/api/posts", (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    userId: userId || null,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  const { title, content, userId } = req.body;
  posts[postIndex] = { ...posts[postIndex], title, content, userId };

  res.json(posts[postIndex]);
});

app.delete("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  const deletedPost = posts.splice(postIndex, 1)[0];
  res.json({ message: "Post deleted", post: deletedPost });
});

// Get posts by user
app.get("/api/users/:id/posts", (req, res) => {
  const userId = parseInt(req.params.id);
  const userPosts = posts.filter((p) => p.userId === userId);
  res.json(userPosts);
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log("  GET    /api/health");
  console.log("  GET    /api/users");
  console.log("  GET    /api/users/:id");
  console.log("  POST   /api/users");
  console.log("  PUT    /api/users/:id");
  console.log("  DELETE /api/users/:id");
  console.log("  GET    /api/posts");
  console.log("  GET    /api/posts/:id");
  console.log("  POST   /api/posts");
  console.log("  PUT    /api/posts/:id");
  console.log("  DELETE /api/posts/:id");
  console.log("  GET    /api/users/:id/posts");
});

module.exports = app;
