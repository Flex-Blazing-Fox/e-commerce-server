"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
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
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
          isUnique: (value, next) => {
            User.findAll({
              where: { email: value },
              attributes: ["id"],
            })
              .then((user) => {
                if (user.length != 0) next("Email is not unique");
                next();
              })
              .catch(() => next({ name: "INTERNAL SERVER ERROR" }));
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "customer",
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.addHook("beforeCreate", (user) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });
  return User;
};
