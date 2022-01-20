"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class jurusans extends Model {
    static associate(models) {
      // define association here
      models.jurusans.belongsTo(models.fakultass, {
        foreignKey: "id_fakultas",
      });
      models.jurusans.hasMany(models.mahasiswas, {
        foreignKey: "id_jurusan",
      });
    }
  }
  jurusans.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "jurusans",
    }
  );
  return jurusans;
};
