//import dependencies
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
//Cors import
const cors = require("cors")
const express = require("express");
const connectToDB = require("./config/connectToDB");
const {FetchNotes,CreateNote,FetchNote,UpdateNote,Deletenote,DeleteAllnote} = require("./controller/noteController");
const paramHandler = require("./controller/parameter_validation");
const {signUp,login,logout,checkAuth} = require("./controller/userController");
const cookieParser = require("cookie-parser")
const requireAuth = require("./middleware/requireAuth")

//create express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:true,
  credentials:true,
}))

//Connect with ba
connectToDB();
//For Create Account 
app.post("/signup",signUp);
// //For Login
 app.post("/login",login);
// //for Logout
app.get("/logout",logout);

//checkAuth
app.get("/check-auth",requireAuth,checkAuth)

//createing note api
app.post("/create", CreateNote);
//fetch all notes
app.get("/notes",FetchNotes);

//fetch note by id
app.get("/note/:id",FetchNote);

//Update Note
app.put("/edit-note/:id",UpdateNote,paramHandler);

//Delete Note ID
app.delete('/delete-note/:id',Deletenote);
//Delete All note
app.delete('/delete-all',DeleteAllnote)
//start server

app.listen(process.env.PORT);
