const express = require("express");
const router = express.Router();
const getAllData = require("../controller/getAllData");

// router to get all the details
router.get("/getall/data", getAllData);

module.exports = router;