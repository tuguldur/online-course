const bcrypt = require("bcryptjs");
const User = require("../models/user");
exports.create = function(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    User.create({ name, email, password }, err => {
      if (err) throw err;
      res.json({ msg: "Welcome!" });
    });
  });
};
exports.login = function(req, res) {
  res.json(req.body);
};
