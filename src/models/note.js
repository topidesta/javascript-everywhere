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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    favoriteCount: { type: Number, default: 0 },
    favoriteBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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
