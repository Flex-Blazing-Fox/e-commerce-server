"use strict";
const fs = require("fs");

let data = JSON.parse(
  fs.readFileSync("./database/product.json", { encoding: "utf-8" })
);

data = data.map((dataPoint) => {
  return {
    ...dataPoint,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", data, {});
    await queryInterface.sequelize.query(
      `SELECT SETVAL('"Products_id_seq"', (SELECT MAX(id) FROM "Products"))`
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Products_id_seq" RESTART`
    );
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
