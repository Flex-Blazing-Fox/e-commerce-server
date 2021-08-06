'use strict';
const fs = require('fs')
const bcrypt = require('bcrypt')
let admin = JSON.parse(fs.readFileSync('./databases/userAdmin.json','utf-8'))
console.log(admin);
admin = admin.map(element => {
  return {
    ...element,
    password : bcrypt.hashSync(element.password,bcrypt.genSaltSync(10)),
    createdAt: new Date(),
    updatedAt: new Date()

  }
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', admin, {})
    // await queryInterface.sequelize.query(`SELECT setval('"Users_id_seq"',(SELECT MAX(id) FROM "Users))`)
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
    await queryInterface.bulkDelete('Users',null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
