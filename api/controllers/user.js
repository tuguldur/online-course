const bcrypt = require("bcryptjs");
const User = require("../models/user");

const config = require("config");
const jwt = require("jsonwebtoken");
exports.create = function(req, res) {
  const { email, username, password } = req.body;
  if (!email.trim() && !username.trim() && !password)
    return res.status(400).json({
      email: "This field is required",
      username: "This field is required",
      password: "This field is required"
    });
  if (!email.trim())
    return res.status(400).json({ email: "This field is required" });
  if (!username.trim())
    return res.status(400).json({ username: "This field is required" });
  if (!password)
    return res.status(400).json({ password: "This field is required" });

  if (username.trim().length < 2 || username.trim().length > 32)
    return res
      .status(400)
      .json({ username: "Must be between 2 and 32 in length" });
  if (password.trim().length < 5 || password.trim().length > 128)
    return res
      .status(400)
      .json({ password: "Must be between 6 and 128 in length" });

  User.findOne({ email }).then(user => {
    if (user)
      return res.status(400).json({ email: "Email is already registered" });
    User.create({ username, email, password }, err => {
      if (err) throw err;
      res.json({ msg: "Welcome!" });
    });
  });
};
exports.login = function(req, res) {
  const { email, password } = req.body;
  // simple validation
  if (!email.trim() && !password)
    return res.status(400).json({
      email: "This field is required",
      password: "This field is required"
    });
  if (!email.trim())
    return res.status(400).json({ email: "This field is required" });
  if (!password)
    return res.status(400).json({ password: "This field is required" });
  // find by email
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ email: "Email does not exist" });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ password: "Password does not match" });
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
