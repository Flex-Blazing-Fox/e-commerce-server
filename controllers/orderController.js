const { Order, Product, sequelize } = require("../models");
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
}

module.exports = orderController;
