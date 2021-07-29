const routers = require("express").Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const authentication = require("../middlewares/authentication");

routers.get("/", (_, res) => res.status(200).send("Welcome"));

routers.use("/user", userRouter);
routers.use(authentication);
routers.use("/product", productRouter);

module.exports = routers;
