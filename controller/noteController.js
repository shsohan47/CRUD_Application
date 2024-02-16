
const Note = require("../models/note")

async function CreateNote (req,res)
{
    //Get the sebt data from reqBody
    const {title, body, type} = req.body;
    //create a note with it
    try{
   const note =  await Note.create({
        title: title,
        body:body,
        type:type
    })
    //response it
    res.json({message: "Created Successfully",
note: note})}
catch(err)
{
    const errors = [];
    for (const [fieldName, error] of Object.entries(err.errors)) {
        errors.push({
            field: fieldName,
            name: error.name,
            message: error.message
        });
        res.json({
            message: "Can not Created the note",
            errors: errors
        });
    }
    
}
}
//Fetch all notes
async function FetchNotes (req,res)
{
    //Find the notess
    try{
    const notes = await Note.find()
    //Response
    res.json({
        message: "All notes retrieve successfully",
        note : notes
    })}
    catch(err)
{
    const errors = [];
    for (const [fieldName, error] of Object.entries(err.errors)) {
        errors.push({
            field: fieldName,
            name: error.name,
            message: error.message
        });
        res.json({
            message: "Can not Fetch all notes",
            errors: errors
        });
    }

}
}

//fetch individual note by id

async function FetchNote(req,res)
{
    try{
    //Get the id using parameter
    const noteId =await req.params.id;
    //find the note using Id
    
    const note = await Note.findById(noteId);
    //Response
    res.json({
          message: "Note retrieve Succesfully",
          note: note  
    })
}
catch(err)
{
    const errors = [];
    for (const [fieldName, error] of Object.entries(err.errors)) {
        errors.push({
            field: fieldName,
            name: error.name,
            message: error.message
        });
        res.json({
            message: "Can not fetch the note",
            errors: errors
        });
    }
    
}


}


//Update Note

async function UpdateNote(req,res)
{
    try{
    //get the id using parameter
    const noteid = await req.params.id;

    //get the data from request body
    const {title,body,type} = req.body;
    //update the note
     await Note.findByIdAndUpdate(noteid,
        {
            title:title,
            body:body,
            type:type
        })

        //find the latest updated note
        const note = await Note.findById(noteid)
    //response

    res.json({
        message: "Note Updated Successfully",
        note: note
    });
}
catch(err)
{
    const errors = [];
    for (const [fieldName, error] of Object.entries(err.errors)) {
        errors.push({
            field: fieldName,
            name: error.name,
            message: error.message
        });
        res.json({
            message: "Can not Edit/update note",
            errors: errors
        });
    }
    
}

}


//Delete Note using id
async function Deletenote (req,res)
{
    try{
    //get the id using param
    const noteid = await req.params.id;
    //Delete the Data
    await Note.deleteOne({_id:noteid})
    //response

    res.json({
        message: "Note Deleted Successfully"
    })
}
catch(err)
{
    const errors = [];
    for (const [fieldName, error] of Object.entries(err.errors)) {
        errors.push({
            field: fieldName,
            name: error.name,
            message: error.message
        });
        res.json({
            message: "Can not Delete the note",
            errors: errors
        });
    }
    
}
}

//importing all function

module.exports ={CreateNote,
FetchNotes,FetchNote,UpdateNote,Deletenote} ;