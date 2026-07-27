const express = require("express");
const { userRegisterController } = require("../controllers/auth.controller");

const router = express.Router();

/* POST /api/auth/register */
router.post("/register", userRegisterController);

/* Optional: support old route */
router.post("/registerUser", userRegisterController);

module.exports = router;