const routers = require("express").Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");


routers.get("/", (_, res) => res.status(200).send("Welcome"));

routers.use("/user", userRouter);
routers.use("/product", productRouter);

module.exports = routers;
