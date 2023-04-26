const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// const { sendMail } = require("../helpers/mail");
const { generateToken } = require("../helpers/common");
// const jwt = require("../helpers/jwt");

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

// Registration for Users
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

// Forgot Password for Users
// module.exports.forgotPassword = asyncHandler(async (req, res) => {
//   try {
//     const { body } = req;

//     const user = await knex("Users")
//       .select("id", "email")
//       .first()
//       .where("email", body.email);
//     if (!user) {
//       return res.status(400).json({
//         error: true,
//         message: "User with this email not exists.",
//         data: [],
//       });
//     }
//     const payload = {
//       user_id: user.id,
//       email: user.email,
//     };
//     const token = await jwt.encode(payload);
//     const url = process.env.CLIENT_BASE_URL || "http://localhost:4000";
//     let mailOptions = {
//       from: `Complete Greet <contact@completegreet.com>`,
//       to: body.email,
//       subject: `Complete Greet: Reset your password`,
//       html: `<h2>Please click on given link to reset your password.</h2>
//               <p>${url}/reset-password/${token}</p>`,
//     };

//     const updateUser = await knex("Users")
//       .update({ pass_reset: token })
//       .where("email", body.email);
//     if (!updateUser) {
//       return res.status(400).json({
//         error: true,
//         message: "Reset password link error.",
//         data: null,
//       });
//     } else {
//       let mailInfo = await sendMail(mailOptions);
//       console.log(
//         "🚀 ~ file: userController.js:164 ~ module.exports.forgotPassword=asyncHandler ~ mailInfo:",
//         mailInfo
//       );
//       if (!mailInfo) {
//         return res.status(400).json({
//           error: true,
//           message: "Mail send failed.",
//           data: null,
//         });
//       }
//       return res.status(200).json({
//         error: false,
//         message: "Mail send successfully.",
//         data: token,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: true,
//       message: "Something went wrong!!",
//       data: null,
//     });
//   }
// });

// // Reset Password for Users
// module.exports.resetPassword = asyncHandler(async (req, res) => {
//   try {
//     const { new_password, confirm_password, reset_link } = req.body;
//     if (new_password !== confirm_password) {
//       res.status(400).json({
//         error: true,
//         message: "Password not match!.",
//         data: null,
//       });
//     }
//     if (!checkPasswordFormat(new_password)) {
//       res.status(500).json({
//         error: true,
//         message: "Please fillup all criteria of password!",
//         data: null,
//       });
//     }
//     const hashPass = await hashPassword(new_password);
//     if (reset_link) {
//       const tokenData = await jwt.decode(reset_link);
//       if (!tokenData) {
//         res.status(400).json({
//           error: true,
//           message: "Invalid reset token!.",
//           data: null,
//         });
//       }
//       let user = await knex("Users")
//         .update({ password: hashPass })
//         .where({ id: tokenData.user_id });
//       if (!user) {
//         res.status(404).json({
//           error: true,
//           message: "User not found.",
//           data: null,
//         });
//       }
//       return res.status(200).json({
//         error: false,
//         message: "Password reset successfully.",
//         data: null,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: true,
//       message: "Something went wrong!!",
//       data: null,
//     });
//   }
// });
