const express = require("express");
const {
  createSubscription,
  unSubscriped,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/create_subscription", createSubscription);
router.post("/unsubscripe", unSubscriped);
module.exports = router;
