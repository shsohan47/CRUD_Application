// Import dependencies
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const connectToDB = require("./config/connectToDB");
const {
  FetchNotes,
  CreateNote,
  FetchNote,
  UpdateNote,
  Deletenote,
  DeleteAllnote,
  SearchByName // Renamed from SearchByName
} = require("./controller/noteController"); // Corrected import
const paramHandler = require("./controller/parameter_validation");
const {
  signUp,
  login,
  logout,
  checkAuth,
} = require("./controller/userController");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middleware/requireAuth");

// Create express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Connect to database
connectToDB();

// Routes
app.post("/signup", signUp); // For creating an account
app.post("/login", login); // For user login
app.get("/logout", logout); // For user logout
app.get("/check-auth", requireAuth, checkAuth); // Middleware for checking user authentication

// Note-related routes
app.post("/create", requireAuth, CreateNote); // Create a new note
app.get("/notes", requireAuth, FetchNotes); // Fetch all notes
app.get("/note/:id", requireAuth, FetchNote); // Fetch a note by ID
app.put("/edit-note/:id", requireAuth, UpdateNote); // Update a note
app.delete("/delete-note/:id", requireAuth, Deletenote); // Delete a note by ID
app.delete("/delete-all", requireAuth, DeleteAllnote); // Delete all notes
app.get("/search", requireAuth, SearchByName); // Search for notes by title or body

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
