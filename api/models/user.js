const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  verified: {
    type: Boolean,
    default: false
  },
  courses: {
    type: Array,
    default: null
  },
  date: {
    type: Date,
    default: new Date()
  }
});
// hash user password before saving into database
userSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  this.email = this.email.trim();
  next();
});
const user = mongoose.model("user", userSchema);
module.exports = user;
