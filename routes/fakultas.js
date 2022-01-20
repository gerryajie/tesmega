const express = require("express");

const {
  getAllFakultas,
  createFakultas,
  updateFakultas,
  deleteFakultas,
} = require("../controllers/fakultas");

const router = express.Router();

router.get("/all", getAllFakultas);
router.post("/create", createFakultas);
router.patch("/update", updateFakultas);
router.delete("/destroy", deleteFakultas);

module.exports = router;
