const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");

require("dotenv").config();

const gravatar = require("../utils/gravatar");

module.exports = {
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: "Desta Fadilah",
    });
  },
  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, { content, id }, { models }) => {
    return await models.Note.findOneAndUpdate(
      { _id: id },
      { $set: { content } },
      { new: true }
    );
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    // pastikan email gak 4l4y
    email = email.trim().toLowerCase();
    // hash password
    const hashed = await bcrypt.hash(password, 10);
    // gravatar url
    const avatar = gravatar(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      });
      // create dan return jwt
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      // kalo gagal buat akun, gagalkan!
      throw new Error("Gagal Membuat Akun!");
    }
  },
  signIn: () => {},
};
