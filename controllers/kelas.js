const { mataKuliahs, mahasiswas, kelass } = require("../models");

class Kelas {
  async getAllKelas(req, res, next) {
    try {
      let data = await kelass.findAll({});

      if (data.length === 0) {
        return next({
          message: "Tidak ada Kelas",
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

  async getAllMataKuliahMahasiswa(req, res, next) {
    try {
      let data = await mataKuliahs.findAll({
        include: [
          {
            model: kelass,
            attributes: ["ruangan"],
            include: [
              {
                model: mahasiswas,
                attributes: ["name"],
              },
            ],
          },
        ],
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

  async createMataKuliahSiswa(req, res, next) {
    try {
      const { ruangan, id_mahasiswa, id_mataKuliah } = req.body;
      const newData = await kelass.create({
        ruangan: ruangan,
        id_mahasiswa: id_mahasiswa,
        id_mataKuliah: id_mataKuliah,
      });
      const data = await kelass.findOne({
        where: { id: newData.id },
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
  async updateMataKuliahSiswa(req, res, next) {
    try {
      const { ruangan, id_mahasiswa, id_mataKuliah } = req.body;
      const data = await kelass.findOne({
        where: { id: req.params.id },
      });
      if (data === null) {
        return res.status(404).json({ errors: "Mata Kuliah tidak ditemukan" });
      }
      const updateData = await kelass.update(
        {
          ruangan: ruangan,
          id_mahasiswa: id_mahasiswa,
          id_mataKuliah: id_mataKuliah,
        },
        { where: { id: req.params.id } }
      );
      const datanew = await kelass.findOne({
        where: { id: req.params.id },
      });

      res.status(201).json({
        status: 201,
        success: true,
        message: "Sukses update Mata Kuliah",
        data: datanew,
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
  async deleteMataKuliahMahasiswa(req, res, next) {
    try {
      const currentMataKuliah = await kelass.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (currentMataKuliah === null) {
        return res
          .status(404)
          .json({ status: 500, message: "Mata Kuliah tidak ditemukan!" });
      }
      await kelass.destroy({ where: { id: req.params.id } });

      res.status(200).json({
        status: 200,
        success: true,
        message: "Delete Mata Kuliah Sukses",
      });
    } catch (error) {
      console.log("errorr", error);
      res.status(500).json({
        status: 500,
        success: false,
        errors: "Tidak dapat menghapus Mata Kuliah!",
        message: error,
      });
    }
  }
}

module.exports = new Kelas();
