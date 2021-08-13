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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Email cannot be null'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Password cannot be null'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Role cannot be null'
        },
        len: {
          args: [5, 20],
          msg: 'Password minimum 5 characters'
        }
      }
    },
  }, {
    sequelize,
    hooks: {
      beforeCreate: (User)=>{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(User.password, salt);
        User.password = hash
      }
    },
    modelName: 'User',
  });
  User.associate = function (models) {
    User.hasMany(models.Cart, {foreignKey: 'custId'})
    User.hasMany(models.Transaction, {foreignKey: 'custId'})
  }
  return User;
};