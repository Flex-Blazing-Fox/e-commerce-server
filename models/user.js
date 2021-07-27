'use strict';

const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: {
          args: true,
          msg: 'email must not be empty',
        },
        notNull: {
          args: true,
          msg: 'email must not be null',
        },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password must not be empty',
        },
        notNull: {
          args: true,
          msg: 'password must not be null',
        },
      },
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer',
      validate: {
        notEmpty: {
          args: true,
          msg: 'role must not be empty',
        },
        notNull: {
          args: true,
          msg: 'role must not be null',
        },
      },
    },
  }, {
    sequelize,
    hooks: {
      beforeCreate: function (user, options) {
        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password, salt)
      },
    },
    modelName: 'User',
  });
  return User;
};