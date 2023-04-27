const asyncHandler = require("express-async-handler");
const Plan = require("../models/planModel");
// Create a new plan
const createPlan = asyncHandler(async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.json({
      error: false,
      message: "Plan created succefully.=",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `${error.message}`,
      data: null,
    });
  }
});

// Get a single plan
const getPlan = asyncHandler(async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id).select(
      "-createdAt -updatedAt -__v"
    );
    if (!plan) {
      res.status(404).json({
        error: true,
        message: "Plan not found",
        data: null,
      });
    }
    res.json({
      error: false,
      message: "Plan get succefully",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `${error.message}`,
      data: null,
    });
  }
});

// Get all plans
const getPlans = asyncHandler(async (req, res) => {
  try {
    const plans = await Plan.find({}).select("-createdAt -updatedAt -__v");
    res.json({
      error: false,
      message: "Plan get succefully",
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "something went worng",
      data: null,
    });
  }
});

const updatePlan = asyncHandler(async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "limit", "price", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!plan) {
      res.json({
        error: true,
        message: "Plan not updated",
        data: plan,
      });
    }
    res.json({
      error: false,
      message: "Plan updated succefully",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "something went worng",
      data: null,
    });
  }
});

// Delete a single plan
const deletePlan = asyncHandler(async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      res.status(404).json({
        error: true,
        message: "plan not found",
        data: null,
      });
    }
    res.json({
      error: false,
      message: "Plan deleted succefully",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "something went wrong",
      data: null,
    });
  }
});

module.exports = {
  createPlan,
  getPlan,
  getPlans,
  updatePlan,
  deletePlan,
};
