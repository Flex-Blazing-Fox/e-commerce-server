const { Order, Product } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const axios = require("axios");

class orderController {
  static createOrder(req, res, next) {
    let user_id = req.userId;
    let orders = req.body.map((order) => {
      return { user_id: +user_id, item_id: +order.id, count: +order.count };
    });
    axios({
      method: "GET",
      url: "https://random.justyy.workers.dev/api/random/?cached&n=15&x=48",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        orders = orders.map((order) => {
          order.order_id = result.data;
          return order;
        });
        return Order.bulkCreate(orders, { returning: true });
      })
      .then((results) => {
        results = results.map((result) => result.dataValues);
        results.forEach((result) => {
          Product.update(
            {
              stock: sequelize.literal(`stock - ${result.count}`),
            },
            {
              where: {
                id: result.item_id,
              },
            }
          );
        });
        res.status(200).json({ message: "Successfully make an order" });
      })
      .catch((err) => next(err));
  }
  static getRecommendations(req, res, next) {
    let { ids } = req.body;
    Order.findAll({
      where: {
        item_id: {
          [Op.in]: ids,
        },
      },
    })
      .then((results) => {
        results = results.map((result) => result.dataValues);
        let order_ids = [];
        results.forEach((result) => {
          if (!order_ids.includes(result.order_id))
            order_ids.push(result.order_id);
        });
        return Order.findAll({
          where: {
            order_id: {
              [Op.in]: order_ids,
            },
          },
        });
      })
      .then((results) => {
        results = results.map((result) => result.dataValues);
        results = results.filter((result) => !ids.includes(result.item_id));
        let counter = {};
        results.forEach((result) => {
          if (result.item_id in counter) {
            counter[result.item_id]++;
          } else {
            counter[result.item_id] = 1;
          }
        });
        let max_occurence = Object.keys(counter).reduce((a, b) => {
          return counter[a] > counter[b] ? a : b;
        });
        res.status(200).json({ recommended_item_id: max_occurence });
      })
      .catch((err) => next(err));
  }
}

module.exports = orderController;
