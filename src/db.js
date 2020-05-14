const mongoose = require("mongoose");

module.exports = {
  connect: (DB_HOST) => {
    // Monggo driver
    mongoose.set("useNewUrlParser", true);
    // Use findOneAndUpdate() in place of findAndModify()
    mongoose.set("useFindAndModify", false);
    // Use createIndex() in place of ensureIndex()
    mongoose.set("useCreateIndex", true);
    // Use the new server discovery and monitoring engine
    mongoose.set("useUnifiedTopology", true);
    // Connect to the DB
    mongoose.connect(DB_HOST);
    // log error
    mongoose.connection.on("error", (err) => {
      console.log(err);
      console.log("Monggo Connection Error");
      process.exit();
    });
  },
  close: () => {
    mongoose.connection.close();
  },
};
