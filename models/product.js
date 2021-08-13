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
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Name cannot be null'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Image cannot be null'
        }
      }
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Price cannot be null'
        }
      }
    },
    stock: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Stock cannot be null'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.associate = function (models) {
    Product.hasMany(models.Cart, {foreignKey: 'productId'})
  }
  return Product;
};