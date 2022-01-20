"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mataKuliahs extends Model {
    static associate(models) {
      // define association here
      models.mataKuliahs.hasMany(models.kelass, {
        foreignKey: "id_mataKuliah",
      });
    }
  }
  mataKuliahs.init(
    {
      matKul: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "mataKuliahs",
    }
  );
  return mataKuliahs;
};
