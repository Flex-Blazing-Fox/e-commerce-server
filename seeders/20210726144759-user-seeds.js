'use strict';

const fs = require('fs')
const bcrypt = require('bcrypt')

let data = JSON.parse(fs.readFileSync('./databases/users.json', {encoding: 'utf-8'}))

data = data.map(el => {
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(el.password,salt)
  return {
    ...el,
    password:hash,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
