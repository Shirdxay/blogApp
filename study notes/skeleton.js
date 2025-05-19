/*
  create server with express.js and basic routing
*/
// app.js (or any other filename you prefer)
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());

// Example route: GET request
app.get("/", (req, res) => {
  res.send("Hello, world! This is the skeleton code");
});

// Example route: POST request
app.post("/create-profile", (req, res) => {
  // Logic to create a new user profile (e.g., save to a database)
  const { username, email } = req.body;
  // ... Your custom logic here ...
  res.send(`Profile created for ${username} with email ${email}`);
});

// Example route: PUT request
app.put("/update-profile/:userId", (req, res) => {
  const userId = req.params.userId;
  // Logic to update user profile with the specified userId
  // ... Your custom logic here ...
  res.send(`Profile with ID ${userId} updated`);
});

// Example route: DELETE request
app.delete("/delete-profile/:userId", (req, res) => {
  const userId = req.params.userId;
  // Logic to delete user profile with the specified userId
  // ... Your custom logic here ...
  res.send(`Profile with ID ${userId} deleted`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
