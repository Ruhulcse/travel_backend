const express = require("express");
const { musicList } = require("../controllers/musicController");
const router = express.Router();

router.get("/get_music", musicList);
module.exports = router;
