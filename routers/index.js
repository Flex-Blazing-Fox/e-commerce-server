const routers = require("express").Router();
const userRouter = require("./userRouter");
const authentication = require("../middlewares/authentication");

routers.get("/", (_, res) => res.status(200).send("Welcome"));

routers.use("/user", userRouter);
routers.use(authentication);

module.exports = routers;
