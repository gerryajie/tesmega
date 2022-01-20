"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class fakultass extends Model {
    static associate(models) {
      // define association here
      models.fakultass.hasMany(models.jurusans, {
        foreignKey: "id_jurusan",
      });
    }
  }
  fakultass.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "fakultass",
    }
  );
  return fakultass;
};
