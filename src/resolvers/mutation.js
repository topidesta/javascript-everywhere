module.exports = {
  newNote: async (parent, args) => {
    return await models.Note.create({
      content: args.content,
      author: "Desta Fadilah",
    });
  },
};
