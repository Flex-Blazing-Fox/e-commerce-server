const { Product, Order } = require("../models");
const getValidationErrorDetails = require("../helpers/getValidationErrorDetails");

class productController {
  static getAllProducts(_, res, next) {
    Product.findAll()
      .then((results) => {
        results = results.map((result) => result.dataValues);
        res.status(200).json(results);
      })
      .catch(() => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
  static getProduct(req, res, next) {
    let { id } = req.params;
    Product.findOne({
      where: {
        id: +id,
      },
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
  static createProduct(req, res, next) {
    let { name, image_url, price, stock } = req.body;
    Product.create(
      {
        name: name,
        image_url: image_url,
        price: price,
        stock: stock,
      },
      {
        returning: true,
        plain: true,
      }
    )
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          next({
            name: "SEQUELIZE VALIDATION ERROR",
            details: getValidationErrorDetails(err),
          });
        } else {
          next({ name: "INTERNAL SERVER ERROR" });
        }
      });
  }
  static updateProductValue(req, res, next) {
    const { id } = req.params;
    Product.update(req.body, {
      where: {
        id: +id,
      },
      returning: true,
    })
      .then((result) => res.status(200).json(result[1][0]))
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          next({
            name: "SEQUELIZE VALIDATION ERROR",
            details: getValidationErrorDetails(err),
          });
        } else {
          next({ name: "INTERNAL SERVER ERROR" });
        }
      });
  }
  static updateProductRecord(req, res, next) {
    let { id } = req.params;
    const keys = ["name", "image_url", "price", "stock"];
    let hasAllKeys = keys.every((item) => req.body.hasOwnProperty(item));
    if (!hasAllKeys) {
      next({ name: "UPDATE METHOD NEED ALL DATA" });
    } else {
      let { name, image_url, price, stock } = req.body;

      Product.update(
        { name, image_url, price, stock },
        {
          where: {
            id: +id,
          },
          returning: true,
        }
      )
        .then((result) => res.status(200).json(result[1][0]))
        .catch((err) => {
          if (err.name === "SequelizeValidationError") {
            next({
              name: "SEQUELIZE VALIDATION ERROR",
              details: getValidationErrorDetails(err),
            });
          } else {
            next(err);
          }
        });
    }
  }

  static deleteProduct(req, res, next) {
    let { id } = req.params;
    Product.destroy({
      where: {
        id: +id,
      },
      returning: true,
    })
      .then((_) =>
        res
          .status(200)
          .json({ message: `Record with id ${id} successfully deleted` })
      )
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = productController;
