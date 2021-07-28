'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product_Type, { foreignKey: 'type_id' })
    }
  };
  Type.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'type name must not be empty',
        },
        notNull: {
          args: true,
          msg: 'type name must not be null',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};