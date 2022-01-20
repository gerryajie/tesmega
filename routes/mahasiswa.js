const express = require("express");

const {
  getAllMahasiswa,
  getAllMahasiswaAndJurusan,
  getAllMahasiswaAndMatKul,
  updateMahasiswa,
  createMahasiswa,
  deleteMahasiswa,
} = require("../controllers/mahasiswa");

const router = express.Router();

router.get("/all", getAllMahasiswa);
router.get("/:id", getAllMahasiswaAndJurusan);
router.get("/matkul/:id", getAllMahasiswaAndMatKul);
router.put("/update/:id", updateMahasiswa);
router.post("/", createMahasiswa);
router.delete("/:id", deleteMahasiswa);

module.exports = router;
