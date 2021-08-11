const router = require("express").Router();
const orderController = require("../controllers/orderController")
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.post("/", orderController.createOrder)

module.exports = router