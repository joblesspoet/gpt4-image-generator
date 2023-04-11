const express = require("express");
const { imageGnerator } = require("../controllers/imageGeneratorController");
const router = express.Router();

router.post("/generateImage", imageGnerator);

module.exports = router;
