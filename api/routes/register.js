const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const teacher = require("../controllers/teacher");
/**
 * /api/register:
 *   post:
 *     description:
 *     responses:
 *       200:
 */
router.post("/", user.create);
router.post("/teacher", teacher.create);
module.exports = router;
