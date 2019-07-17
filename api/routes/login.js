const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
/**
 * /api/login:
 *   post:
 *     description:
 *     responses:
 *       200:
 */

router.post("/", user.login);

module.exports = router;
