const router = require("express").Router();
const ProductController = require("../controllers/productController");
const authentication = require("../middlewares/authentication");
const authorize = require("../middlewares/productAuthorization");

router.get("/:id", ProductController.getProduct);
router.get("/", ProductController.getAllProducts);
router.use(authentication);
router.post("/", authorize, ProductController.createProduct);
router.patch("/:id", authorize, ProductController.updateProductValue);
router.put("/:id", authorize, ProductController.updateProductRecord);
router.delete("/:id", authorize, ProductController.deleteProduct);

module.exports = router;
