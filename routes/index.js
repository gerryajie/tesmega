const route = require("express").Router();

const mahasiswa = require("./mahasiswa");
const fakultas = require("./fakultas");
const matakuliah = require("./matakuliah");
const jurusan = require("./jurusan");
const kelas = require("./kelas");

route.use("/mahasiswa", mahasiswa);
route.use("/fakultas", fakultas);
route.use("/matkul", matakuliah);
route.use("/jurusan", jurusan);
route.use("/kelas", kelas);

module.exports = route;
