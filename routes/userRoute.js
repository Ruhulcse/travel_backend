const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  forgotPassword,
  resetPassword,
  checkEmailExist,
  checkToken,
} = require("../controllers/userController");
const { upload } = require("../middlewares/imageUpload");

router.post("/register", registration);
router.post("/login", login);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);
// router.post("/email-check", checkEmailExist);
// router.post("/token-check", checkToken);

module.exports = router;
