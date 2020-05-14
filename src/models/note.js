// monggo library
const mongoose = require("mongoose");

// skema database
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    // timestame created added
    timestamps: true,
  }
);

// Definisi model note dengan skema
const Note = mongoose.model("Note", noteSchema);

// export module
module.exports = Note;
