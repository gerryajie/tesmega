const express = require("express");

const {
  getAllKelas,
  createMataKuliahSiswa,
  updateMataKuliahSiswa,

  deleteMataKuliahMahasiswa,
} = require("../controllers/kelas");

const router = express.Router();

router.get("/getall", getAllKelas);

router.post("/matkul", createMataKuliahSiswa);
router.put("/update/:id", updateMataKuliahSiswa);
router.delete("/:id", deleteMataKuliahMahasiswa);

module.exports = router;
