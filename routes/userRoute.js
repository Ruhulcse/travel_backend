const express = require("express");
const router = express.Router();
const { registration, login } = require("../controllers/userController");
const { getAll, create } = require("../controllers/contactController");

router.post("/register", registration);
router.post("/login", login);
router.post("/create", create);
router.get("/get_content", getAll);
module.exports = router;
