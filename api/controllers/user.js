const bcrypt = require("bcryptjs");
const User = require("../models/user");

const config = require("config");
const jwt = require("jsonwebtoken");
exports.create = function(req, res) {
  const { name, email, password } = req.body;
  // simple validation
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
  const { email, password } = req.body;
  // simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // find by email
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "Email does not exist." });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ msg: "Password does not match." });
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        {
          expiresIn: 3600 //3600 seconds
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email }
          });
        }
      );
    });
  });
};
