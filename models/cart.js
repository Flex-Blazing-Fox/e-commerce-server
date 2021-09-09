'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cart.init({
    custId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cart',
  });
  Cart.associate = function (models) {
    Cart.belongsTo(models.Product, {foreignKey: 'productId'})
    Cart.belongsTo(models.User, {foreignKey:'custId'})
  }
  return Cart;
};