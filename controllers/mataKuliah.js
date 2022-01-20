const { mataKuliah } = require("../models");

class MataKuliah {
  async getAllMataKuliah(req, res, next) {
    try {
      let data = await mataKuliah.findAll({
        atributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
      });

      if (data.length === 0) {
        return next({
          message: "Tidak ada mata kuliah",
          statusCode: 404,
        });
      }
      res.status(200).json({
        status: 200,
        success: true,
        message: `Success get all mataKuliah`,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async createMataKuliah(req, res, next) {
    try {
      const insertData = await mataKuliah.create(req.body);
      const data = await mataKuliah.findOne({
        where: { id: insertData.id },
      });

      res.status(201).json({
        status: 201,
        success: true,
        message: "Success create mataKuliah",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateMataKuliah(req, res, next) {
    try {
      const insertData = await mataKuliah.update(req.body);
      const data = await mataKuliah.findOne({
        where: { id: dataMataKuliah.id },
      });
      if (data === null) {
        return res.status(404).json({ errors: "Mata Kuliah tidak ditemukan" });
      }
      await mataKuliah.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      const listMataKuliah = await mataKuliah.findOne({
        where: {
          id: req.params.id,
        },
        atributes: {
          exclude: [
            "id_jurusan",
            "id_fakultas",
            "createdAt",
            "updatedAt",
            "deletedAt",
          ],
        },
        include: [
          {
            model: id_mahasiswa,
            atributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: matkul,
            atributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
          },
        ],
      });

      res.status(201).json({
        status: 201,
        success: true,
        message: "Sukses update Mata Kuliah",
        data: listMataKuliah,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        errors: "Error untuk Update Mata Kuliah",
        message: error,
      });
    }
  }
  async deleteMataKuliah(req, res, next) {
    try {
      const data = await mataKuliah.findOne({ where: { id } });
      const currentMataKuliah = await mataKuliah.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (currentMataKuliah === null) {
        return res
          .status(404)
          .json({ status: 500, message: "Mata Kuliah tidak ditemukan!" });
      }
      await mataKuliah.destroy({ where: { id: req.params.id } });

      res.status(200).json({
        status: 200,
        success: true,
        message: "Delete Mata Kuliah Sukses",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        errors: "Tidak dapat menghapus Mata Kuliah!",
        message: error,
      });
    }
  }
}

module.exports = new MataKuliah();
