const express = require("express");
const {
  createPlan,
  getPlan,
  deletePlan,
  updatePlan,
  getPlans,
} = require("../controllers/planController");
const router = express.Router();

router.route("/api/plan").post(createPlan).get(getPlans);
// router.post("/api/plan", createPlan);
router.route("/api/plan/:id").get(getPlan).delete(deletePlan).put(updatePlan);

module.exports = router;
