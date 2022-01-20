"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("kelass", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ruangan: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      id_mahasiswa: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "mahasiswas",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      id_mataKuliah: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "mataKuliahs",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("fakultass");
  },
};
