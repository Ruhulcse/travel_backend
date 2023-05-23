const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../helpers/common");

// Login for Users
module.exports.login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        error: false,
        message: "successfully logged in",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          name: `${user.firstname} ${user.lastname}`,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Something went wrong!!",
      data: null,
    });
  }
});

// Registration for Users only
module.exports.registration = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(409).json({ message: "user already exist" });
  }

  const user = new User({
    email,
    password,
    firstname,
    lastname,
  });

  try {
    const createUser = await user.save();
    res.json({
      error: false,
      message: "registration successfully done!",
      data: createUser,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Something went wrong!!",
      data: null,
    });
  }
});
