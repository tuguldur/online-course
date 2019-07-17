const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.send("🎉");
});

router.use("/register", require("./register"));
router.use("/auth", require("./auth.js"));

module.exports = router;
