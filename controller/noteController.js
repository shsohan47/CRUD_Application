const Note = require("../models/note");
const paramHandler = require("../controller/parameter_validation");

async function CreateNote(req, res) {
  //Get the sebt data from reqBody
  const { title, body, type } = req.body;
  //create a note with it
  try {
    const note = await Note.create({
      title: title,
      body: body,
      type: type,
      user : req.user._id
    });
    //response it
    res.json({ message: "Created Successfully", note: note });
  } catch (err) {
    const errors = [];
    for (const [fieldName, error] of Object.entries(err.errors)) {
      errors.push({
        field: fieldName,
        name: error.name,
        message: error.message,
      });
      res.json({
        message: "Can not Created the note",
        errors: errors,
      });
    }
  }
}
// Fetch all notes
async function FetchNotes(req, res) {
  try {
    const notes = await Note.find({user:req.user._id});
    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }
    res.json({
      message: "All notes retrieved successfully",
      notes: notes,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}


//fetch individual note by id

async function FetchNote(req, res) {
  const noteID = await req.params.id;
  
  await paramHandler(req, res, noteID);
}

//Update Note

async function UpdateNote(req, res) {
  try {
    //get the id using parameter
    const noteid = await req.params.id;

    //get the data from request body
    const { title, body, type } = req.body;
    //update the note
    await Note.findOneAndUpdate({_id:noteid, user:req.user._id}, {
      title: title,
      body: body,
      type: type,
    });

    //find the latest updated note 
   const note = await Note.findOne({_id:noteid, user:req.user._id});

   res.json({
    notes:note
   })
  } catch (err) {
    res.json({
      message: "failed To update",
      error: err,
    });
  }
}

//Delete Note using id
async function Deletenote(req, res) {
  const noteid = await req.params.id;
  try {
    //get the id using param

    //Delete the Data
    await Note.deleteOne({ _id: noteid ,user:req.user._id});
    //response

    res.json({
      message: "Note Deleted Successfully",
    });
  } catch (err) {
    paramHandler(req, res, noteid);
  }
}

//Delete Note using id
async function DeleteAllnote(req, res) {
  //const noteid = await req.params.id;
  try {
    //get the id using param

    //Delete the Data
    await Note.deleteMany({user:req.user._id});
    //response

    res.json({
      message: "All Note Deleted Successfully",
    });
  } catch (err) {
    paramHandler(req, res, noteid);
  }
}

async function SearchByName(req,res){
  const {search}  = req.query
  try{

    const filterNotes = await Note.find({
      $or:[
        {title:{
          $regex:search, $options: "i"
        }},
        {body:{
          $regex:search, $options: "i"
        }},
      ],user:req.user._id,
    })
    if(filterNotes.length === 0)
    {
      return res.status(404).json({
        message: "No note Matched!"
      })
    }
    //response
    res.json({
      message:"search result",
      notes:filterNotes
    })

  }catch(err)
  {
    return res.status(500).json({
      message: "Internal Server error",
      error: err
    })
  }
}

//importing all function

module.exports = {
  CreateNote,
  FetchNotes,
  FetchNote,
  UpdateNote,
  Deletenote,
  DeleteAllnote,
  SearchByName
};
