const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.send("🎉");
});

router.use("/register", require("./register"));
router.use("/login", require("./login.js"));

module.exports = router;
