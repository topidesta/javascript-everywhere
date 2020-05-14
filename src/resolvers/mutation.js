const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");

require("dotenv").config();

const gravatar = require("../utils/gravatar");

module.exports = {
  newNote: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("Login Terlebih Dahulu!");
    }

    return await models.Note.create({
      content: args.content,
      author: mongoose.Types.ObjectId(user.id),
    });
  },
  deleteNote: async (parent, { id }, { models }) => {
    if (!user) {
      throw new AuthenticationError("Login Dahulu Sebelum Dihapus");
    }
    // cari note berdasarkan id
    const note = await models.Note.findById(id);

    // kalo catatan bukan punya dia sendiri, munculin error
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("Akses menghapus anda salah");
    }

    try {
      await note.remove();
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, { content, id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("Login Dahulu Sebelum Diubah");
    }
    // cari note berdasar id
    const note = await models.Note.findById(id);

    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("Tidak punya akses untuk merubah");
    }

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
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      // biar gak alay
      email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
      throw new AuthenticationError("Gagal Masuk");
    }

    // jika password tidak cocok munculin error
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError("Password Salah");
    }
    // buat dan return jwt
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
