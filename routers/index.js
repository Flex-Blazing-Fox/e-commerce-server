const routers = require("express").Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter")


routers.get("/", (_, res) => res.status(200).send("Welcome"));

routers.use("/user", userRouter);
routers.use("/product", productRouter);
routers.use("/order", orderRouter)

module.exports = routers;
