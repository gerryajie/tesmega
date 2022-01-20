"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class kelass extends Model {
    static associate(models) {
      // define association here
      models.kelass.belongsTo(models.mahasiswas, {
        foreignKey: "id_mahasiswa",
      });
      models.kelass.belongsTo(models.mataKuliahs, {
        foreignKey: "id_mataKuliah",
      });
    }
  }
  kelass.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "kelass",
    }
  );
  return kelass;
};
