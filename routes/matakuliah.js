const express = require("express");

const {
  getAllMataKuliah,
  createMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} = require("../controllers/mataKuliah");

const router = express.Router();

router.get("/getAll", getAllMataKuliah);
router.post("/matkul", createMataKuliah);
router.patch("/update", updateMataKuliah);
router.delete("/:id", deleteMataKuliah);

module.exports = router;
