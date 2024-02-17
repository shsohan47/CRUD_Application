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
//create express app
const app = express();
app.use(express.json());
app.use(cors())

//Connect with DataBase
connectToDB();


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
