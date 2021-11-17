const express = require("express");

const {
  getTuits,
  getTuit,
  createTuit,
  deleteTuit,
} = require("../controllers/tuitContollers");

const router = express.Router();

router.get("/", getTuits);
router.get("/:id", getTuit);
router.post("/create", createTuit);
router.post("/delete/:id", deleteTuit);

module.exports = router;
