'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: 'product_id' })
      this.belongsTo(models.Type, { foreignKey: 'type_id' })
    }
  };
  Product_Type.init({
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'product_id must not be empty',
        },
        notNull: {
          args: true,
          msg: 'product_id must not be null',
        },
      },
    },
    type_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'type_id must not be empty',
        },
        notNull: {
          args: true,
          msg: 'type_id must not be null',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Product_Type',
  });
  return Product_Type;
};