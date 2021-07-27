'use strict';
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const fs = require('fs')
let users = JSON.parse(fs.readFileSync('./database/adminSeeding.json', {encoding: "utf-8"}))
  //user hash
users = users.map(user=>{
  return {
    ...user,
    password: bcrypt.hashSync(`${user.password}`, salt),
    createdAt: new Date(),
    updatedAt: new Date()
  }
})
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', users, {})
    await queryInterface.sequelize.query(`
    SELECT setval('"Users_id_seq"' , (SELECT MAX(id) FROM "Users"))`)
    
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
    await queryInterface.bulkDelete('Users')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
