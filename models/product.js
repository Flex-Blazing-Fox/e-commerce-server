'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product_Type, { foreignKey: 'product_id' })
    }
  };
  Product.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'product name must not be empty',
        },
        notNull: {
          args: true,
          msg: 'product name must not be null',
        },
      },
    },
    image_url: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'image_url name must not be empty',
        },
        notNull: {
          args: true,
          msg: 'image_url name must not be null',
        },
      },
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'price must not be empty',
        },
        notNull: {
          args: true,
          msg: 'price must not be null',
        },
        validateNegativeNumber(value) {
          if (value < 0) {
            throw new Error('price must be greater than or equal to 0')
          }
        }
      },
    },
    stock: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'stock must not be empty',
        },
        notNull: {
          args: true,
          msg: 'stock must not be null',
        },
        validateNegativeNumber(value) {
          if (value < 0) {
            throw new Error('stock must be greater than or equal to 0')
          }
        }
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};