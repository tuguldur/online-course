const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
/**
 * /api/register:
 *   post:
 *     description:
 *     responses:
 *       200:
 */
router.post("/", user.create);
module.exports = router;
