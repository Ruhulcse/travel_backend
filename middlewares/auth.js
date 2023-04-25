const jwt = require("../helpers/jwt");
module.exports.authorize = async function (req, res, next) {
  let token =
    req.header("authorization") || req.header("token") || req.query.token;
  if (!token) {
    return next(new Error("user not authorized"));
  }
  if (token.split("Bearer ").length > 1) {
    token = token.split("Bearer ")[1];
  }
  // check token
  const payload = await jwt.decode(token);
  if (!payload)
    return res.status(401).json({
      error: true,
      message: "Auth User Unauthorized",
      data: null,
    });
  req.user = payload;
  next();
};
