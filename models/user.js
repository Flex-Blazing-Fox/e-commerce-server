'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt')
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
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Email can not be null"
      },
      unique: {
        args: true,
        msg: 'Email is already taken'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email can not be empty'
        },
        isEmail: {
          args: true,
          msg: 'Email format is not correct'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Password can not be null"
      },
      validate : {
        len : {
          args : [6],
          msg : "Password at least have 6 characters",
        },
        notEmpty : {
          args : true,
          msg : "Password can not be empty",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Role can not be null"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email can not be empty'
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
      },
    },
  });
  return User;
};