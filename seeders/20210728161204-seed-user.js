"use strict";

const fs = require("fs");
const bcrypt = require("bcrypt");

let data = JSON.parse(
  fs.readFileSync("./database/user.json", { encoding: "utf-8" })
);
const salt = bcrypt.genSaltSync(10);

data = data.map((dataPoint) => {
  const hash = bcrypt.hashSync(dataPoint.password, salt);
  return {
    email: dataPoint.email,
    password: hash,
    role: dataPoint.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", data, {});
    await queryInterface.sequelize.query(
      `SELECT SETVAL('"Users_id_seq"', (SELECT MAX(id) FROM "Users"))`
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
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Users_id_seq" RESTART`
    );
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
