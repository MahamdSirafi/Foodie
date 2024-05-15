const productController = require('../controllers/productController');
const authMiddlewers = require('./../middlewares/authMiddlewers');
const dynamicImgMiddlewers = require('./../middlewares/dynamicImgMiddlewers');
const dynamicMiddleware = require('./../middlewares/dynamicMiddleware');
const express = require('express');
const router = express.Router();
router
  .route('/')
  .get(productController.getAllproduct)
  .post(
    authMiddlewers.protect,
    authMiddlewers.restrictTo('admin'),
    dynamicImgMiddlewers.uploadPhoto('products', 'image'),
    dynamicMiddleware.setPathImginBody('products', 'image'),
    productController.createproduct
  );
router
  .route('/:id')
  .get(productController.getproduct)
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo('admin'),
    productController.updateproduct
  )
  .delete(
    authMiddlewers.protect,
    authMiddlewers.restrictTo('admin'),
    productController.deleteproduct
  );
router
  .route('/:id/upload')
  .get(productController.getproduct)
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo('admin'),
    dynamicImgMiddlewers.uploadPhoto('products', 'image'),
    dynamicMiddleware.setPathImginBody('products', 'image'),
    productController.updateproduct
  );
module.exports = router;
