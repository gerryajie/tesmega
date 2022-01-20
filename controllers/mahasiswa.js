const { mahasiswas, mataKuliahs, jurusans, kelass } = require("../models");

const pagination = (page, size) => {
  const limit = size ? +size : 6;
  const offset = ((page - 1) * limit) | 0;

  return { limit, offset };
};

const paging = (data, page, limit) => {
  const { count: totalItems, rows: events } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, events, totalPages, currentPage };
};

class Mahasiswa {
  async getAllMahasiswa(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = pagination(page, size);

      let data = await mahasiswas.findAndCountAll({
        limit,
        offset,

        order: [["createdAt", "DESC"]],
      });

      if (data.length === 0) {
        return res
          .status(404)
          .json({ status: 404, message: "Fakultas tidak ditemukan" });
      }
      return res.status(200).json(paging(data, page, limit));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getAllMahasiswaAndJurusan(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = pagination(page, size);

      let data = await mahasiswas.findAndCountAll({
        where: { id_jurusan: req.params.id },
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },

        include: [{ model: jurusans, attributes: ["name"] }],
        limit,
        offset,

        order: [["createdAt", "DESC"]],
      });

      if (data.length === 0) {
        return res
          .status(404)
          .json({ status: 404, message: "Jurusan tidak ditemukan" });
      }
      return res.status(200).json(paging(data, page, limit));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllMahasiswaAndMatKul(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = pagination(page, size);

      let data = await kelass.findAndCountAll({
        where: { id_mahasiswa: req.params.id },
        attributes: {
          exclude: ["name", "id", "createdAt", "updatedAt", "deletedAt"],
        },

        include: [
          { model: mataKuliahs, attributes: ["matKul"] },
          { model: mahasiswas, attributes: ["name"] },
        ],
        limit,
        offset,

        order: [["createdAt", "DESC"]],
      });

      if (data.length === 0) {
        return res
          .status(404)
          .json({ status: 404, message: "Mata Kuliah tidak ditemukan" });
      }
      return res.status(200).json(paging(data, page, limit));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async createMahasiswa(req, res, next) {
    try {
      const { name, id_jurusan } = req.body;
      const newData = await mahasiswas.create({
        name: name,
        id_jurusan: id_jurusan,
      });
      const data = await mahasiswas.findOne({
        where: { id: newData.id },
      });

      res.status(201).json({ data, message: "Sukses Buat Data" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async updateMahasiswa(req, res, next) {
    try {
      const { name, id_jurusan } = req.body;
      const mahasiswaId = await mahasiswas.findOne({
        where: { id: req.params.id },
      });

      const updateData = await mahasiswas.update(
        {
          name: name,
          id_jurusan: id_jurusan,
        },
        { where: { id: req.params.id } }
      );

      const data = await mahasiswas.findOne({
        where: { id: req.params.id },
      });

      res.status(201).json({ data, message: "Sukses Update Data" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteMahasiswa(req, res, next) {
    try {
      const deleteMahasiswas = await mahasiswas.findOne({
        where: { id: req.params.id },
      });

      if (deleteMahasiswas === null) {
        return res
          .status(404)
          .json({ status: 404, message: "Data tidak ditemukan!" });
      }
      await mahasiswas.destroy({ where: { id: req.params.id } });

      res
        .status(200)
        .json({ status: 200, success: true, message: "Sukses hapus Data" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Mahasiswa();
