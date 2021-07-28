const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getValidationErrorDetails = require("../helpers/getValidationErrorDetails");

class userController {
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({
      email,
      password,
    })
      .then((result) =>
        res.status(201).json({ id: result.id, email: result.email })
      )
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
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.dataValues.password)) {
          const payload = {
            id: user.dataValues.id,
          };
          const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200).json({ access_token: accessToken });
        } else {
          throw { name: "EMAIL / PASSWORD AUTHENTICATION FAIL" };
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = userController;
