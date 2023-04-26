const asyncHandler = require("express-async-handler");
const axios = require("axios");

module.exports.musicList = asyncHandler(async (req, res) => {
  try {
    const query = req.query.q;
    const response = await axios.get(
      `https://api.tunetank.com/v1/search/tracks?q=${query}`
    );
    const data = response.data;
    res.json({
      error: false,
      message: "Successfully retrieved music",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Something went wrong!!",
      data: null,
    });
  }
});
