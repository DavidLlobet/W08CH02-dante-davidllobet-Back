const express = require("express");

const { getTuits } = require("../controllers/tuitContollers");

const router = express.Router();

router.get("/", getTuits);

module.exports = router;