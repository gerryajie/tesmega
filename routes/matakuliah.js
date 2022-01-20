const express = require("express");

const {
  getAllMataKuliah,
  createMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
  getAllMataKuliahMahasiswa,
} = require("../controllers/mataKuliah");

const router = express.Router();

router.get("/getall", getAllMataKuliah);
router.get("/getallmahasiswa", getAllMataKuliahMahasiswa);
router.post("/matkul", createMataKuliah);
router.patch("/update", updateMataKuliah);
router.delete("/:id", deleteMataKuliah);

module.exports = router;
