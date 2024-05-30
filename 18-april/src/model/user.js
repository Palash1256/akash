const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
  number: Number,
  //hobbies:[String]
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
