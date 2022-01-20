const express = require("express");

const {
  getAllJurusan,
  createJurusan,
  updateJurusan,
  deleteJurusan,
} = require("../controllers/jurusan");

const router = express.Router();

router.get("/", getAllJurusan);
router.post("/make", createJurusan);
router.patch("/update", updateJurusan);
router.delete("/delete", deleteJurusan);

module.exports = router;
