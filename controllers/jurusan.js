const { jurusans, mahasiswas } = require("../models");

class Jurusan {
  async getAllJurusan(req, res, next) {
    try {
      let data = await jurusans.findAll({
        attributes: ["name", "createdAt", "updatedAt", "deletedAt"],
        include: [
          {
            model: mahasiswas,
            attributes: ["id_mahasiswa"],
          },
        ],
        where: { id_jurusan: req.query.id },
        order: [["id", "desc"]],
      });

      if (data.length === 0) {
        return next({
          message: "Tidak ada Jurusan di Fakultas ini",
          statusCode: 404,
        });
      }
      res.status(200).json({
        status: 200,
        success: true,
        message: `Sukses get all Jurusan`,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async createJurusan(req, res, next) {
    try {
      const insertData = await jurusans.create(req.body);
      const data = await jurusans.findOne({
        where: { id: insertData.id },
      });

      res.status(201).json({
        status: 201,
        success: true,
        message: "Sukses buat Jurusan",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateJurusan(req, res, next) {
    try {
      const data = await jurusans.findOne({
        where: { id },
      });
      if (data === null) {
        return res.status(404).json({ errors: "Jurusan tidak ditemukan" });
      }
      await jurusans.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      const listJurusan = await jurusans.findOne({
        where: {
          id: req.params.id,
        },
        atributes: {
          exclude: ["id_fakultas", "createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: mahasiswas,
            atributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      res.status(201).json({
        status: 201,
        success: true,
        message: "Sukses update Jurusan",
        data: listJurusan,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        errors: "Error untuk Update Jurusan",
        message: error,
      });
    }
  }
  async deleteJurusan(req, res, next) {
    try {
      const data = await jurusans.findOne({ where: { id } });
      const currentJurusan = await jurusans.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (currentJurusan === null) {
        return res
          .status(404)
          .json({ status: 500, message: "Jurusan tidak ditemukan!" });
      }
      await jurusan.destroy({ where: { id: req.params.id } });

      res
        .status(200)
        .json({ status: 200, success: true, message: "Delete Jurusan Sukses" });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        errors: "Tidak dapat menghapus Jurusan!",
        message: error,
      });
    }
  }
}

module.exports = new Jurusan();
