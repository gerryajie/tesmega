"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mahasiswas extends Model {
    static associate(models) {
      // define association here
      models.mahasiswas.hasMany(models.kelass, {
        foreignKey: "id_mahasiswa",
      });
      models.mahasiswas.belongsTo(models.jurusans, {
        foreignKey: "id_jurusan",
      });
    }
  }
  mahasiswas.init(
    {
      name: DataTypes.STRING,
      id_jurusan: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "mahasiswas",
    }
  );
  return mahasiswas;
};
