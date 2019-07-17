const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const teacher = require("../controllers/teacher");
/**
 * /api/auth:
 *   post:
 *     description:
 *     responses:
 *       200:
 */

router.post("/", user.login);
router.post("/teacher", teacher.login);

module.exports = router;
