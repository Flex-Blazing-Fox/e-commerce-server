"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Order.belongsTo(models.Product, {
        foreignKey: "item_id",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
      count: DataTypes.INTEGER,
      order_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
