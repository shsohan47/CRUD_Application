const { default: mongoose } = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: String,
  type: {
    type: String,
    enum: ["note", "quickNote"],
    required: true,
  },
  user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
    }
  
});

const Note = mongoose.model("Note",noteSchema);

module.exports = Note;
