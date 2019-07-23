const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
// middleware
const auth = require("../middlewares/auth");
/**
 * /api/auth:
 *   post:
 *     description:
 *     responses:
 *       200:
 */

router.post("/", user.login);
router.get("/", auth, user.profile);

module.exports = router;
