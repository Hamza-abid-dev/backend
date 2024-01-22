const mongoose = require("mongoose");
const Userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },

    contact: {
      type: String,
      require: true,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Users", Userschema);
