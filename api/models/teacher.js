const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const teacherSchema = new Schema({
  name: {
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

  verified: {
    type: Boolean,
    default: false
  },
  courses: {
    type: Array,
    default: null
  },
  feedback: {
    type: Array,
    default: null
  },
  date: {
    type: Date,
    default: new Date()
  }
});
// hash user password before saving into database
teacherSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
const user = mongoose.model("teacher", userSchema);
module.exports = user;
