//import dependencies
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const connectToDB = require("./config/connectToDB");
const {FetchNotes,CreateNote,FetchNote,UpdateNote,Deletenote} = require("./controller/noteController");
//create express app
const app = express();
app.use(express.json());


//Connect with DataBase
connectToDB();


//createing note api
app.post("/create", CreateNote);
//fetch all notes
app.get("/notes",FetchNotes);

//fetch note by id
app.get("/note/:id",FetchNote);

//Update Note
app.put("/edit-note/:id",UpdateNote);

//Delete Note
app.delete('/delete-note/:id',Deletenote);
//start server

app.listen(process.env.PORT);
