const productController = require("../controllers/productController");
const authMiddlewers = require('./../middlewares/authMiddlewers');
const dynamicImgMiddlewers = require('./../middlewares/dynamicImgMiddlewers');
const dynamicMiddleware = require('./../middlewares/dynamicMiddleware');
const express = require("express");
const router = express.Router();
router.use(authMiddlewers.protect);
router.route("/").get(productController.getAllproduct).post(authMiddlewers.restrictTo("admin"), dynamicImgMiddlewers.uploadPhoto("products", "image"), dynamicMiddleware.setPathImginBody("products", "image"), productController.createproduct);
router
  .route("/:id")
  .get(productController.getproduct)
  .patch(authMiddlewers.restrictTo("admin"), dynamicImgMiddlewers.uploadPhoto("products", "image"), dynamicMiddleware.setPathImginBody("products", "image"), productController.updateproduct)
  .delete(authMiddlewers.restrictTo("admin"), productController.deleteproduct);
module.exports = router;
