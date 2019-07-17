const bcrypt = require("bcryptjs");
const Teacher = require("../models/teacher");

const config = require("config");
const jwt = require("jsonwebtoken");
exports.create = function(req, res) {
  const { name, email, password } = req.body;
  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  Teacher.findOne({ email }).then(teacher => {
    if (teacher)
      return res.status(400).json({ msg: "Email is already registered." });
    Teacher.create({ name, email, password }, err => {
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
  Teacher.findOne({ email }).then(teacher => {
    if (!teacher) return res.status(400).json({ msg: "Email does not exist." });
    bcrypt.compare(password, teacher.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ msg: "Password does not match." });
      jwt.sign(
        { id: teacher.id },
        config.get("jwtSecret"),
        {
          expiresIn: 3600 //3600 seconds
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            teacher: {
              id: teacher.id,
              name: teacher.name,
              email: teacher.email
            }
          });
        }
      );
    });
  });
};
