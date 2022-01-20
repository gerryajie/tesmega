const route = require("express").Router();

const mahasiswa = require("./mahasiswa");
const fakultas = require("./fakultas");
const mataKuliah = require("./matakuliah");
const jurusan = require("./jurusan");

route.use("/mahasiswa", mahasiswa);
// route.use("/fakultas", fakultas);
// route.use("/matkul", mataKuliah);
// route.use("/jurusan", jurusan);

module.exports = route;
