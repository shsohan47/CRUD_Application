const Note = require("../models/note");
async function paramHandler(req, res, noteId) {
  try {
    //find the note using Id

    const note = await Note.findOne({_id:noteId,user: req.user._id});

    res.json({
      message: "Note retrieve Succesfully",
      note: note,
    });
  } catch (err) {
    res.status(400).json({
      message: "Invalid parameter provided",
      error: err,
    });
  }
}

module.exports = paramHandler;
