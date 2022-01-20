const { fakultass, jurusans, mahasiswas } = require("../models");

class Fakultas {
  async getAllFakultas(req, res, next) {
    try {
      let data = await fakultass.findAll({
        attributes: ["fakultas", "createdAt", "updatedAt"],

        include: [
          {
            model: jurusans,
            attributes: ["id_jurusan", "name"],
          },
          {
            model: mahasiswas,
            attributes: ["id", "name"],
          },
        ],
        where: { id_mahasiswa: req.query.id },
        order: [["id_mahasiswa"]],
      });

      if (data.length === 0) {
        return res
          .status(404)
          .json({ status: 404, message: "Fakultas tidak ditemukan" });
      }
    } catch (error) {
      next(error);
    }
  }

  async createFakultas(req, res, next) {
    try {
      const newData = await fakultass.create({
        fakultas: req.body.fakultas,
        mahasiswa: req.body.mahasiswa,
      });
      const data = await fakultas.findOne({
        where: {
          id: newData.id,
        },
        attributes: ["fakultas", "createdAt"],
        include: [
          {
            model: mahasiswa,
            attributes: ["name"],
          },
        ],
      });

      return res
        .status(201)
        .json({ status: 201, data, message: ["Sukses buat Fakultas"] });
    } catch (error) {
      next(error);
    }
  }
  async updateFakultas(req, res, next) {
    try {
      const data = await fakultas.findOne({
        where: { id_fakultas },
      });
      if (data === null) {
        return res
          .status(404)
          .json({ errors: "fakultas yang dicari tidak ditemukan" });
      }
      await fakultas.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      const listFakultas = await fakultas.findOne({
        where: {
          id: req.params.id,
        },
        atributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: nama,
            atributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: id_mahasiswa,
            atributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
          },
        ],
      });

      res.status(201).json({
        status: 201,
        success: true,
        message: "Sukses update Fakultas",
        data: listFakultas,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        errors: "Error untuk Update Fakultas",
        message: error,
      });
    }
  }
  async deleteFakultas(req, res, next) {
    try {
      const data = await fakultas.findOne({ where: { id } });
      const currentFakultas = await fakultas.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (currentFakultas === null) {
        return res
          .status(404)
          .json({ status: 500, message: "Fakultas tidak ditemukan!" });
      }
      await fakultas.destroy({ where: { id: req.params.id } });

      res.status(200).json({
        status: 200,
        success: true,
        message: "Delete Fakultas Sukses",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        errors: "Tidak dapat menghapus Fakultas!",
        message: error,
      });
    }
  }
}

module.exports = new Fakultas();
