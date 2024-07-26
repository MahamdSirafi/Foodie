const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const { checkOwner } = require('../middlewares/checkMiddleware');
const authMiddlewers = require('../middlewares/authMiddlewers');
const dynamicMiddleware = require('../middlewares/dynamicMiddleware');
const orderController = require('../controllers/orderController');
const { checkMony } = require('../middlewares/orderMiddlewers');
router.use(authMiddlewers.protect);
router
  .route('/mien')
  .get(
    authMiddlewers.restrictTo('user'),
    dynamicMiddleware.addQuery('user', 'userId'),
    orderController.getAllOrder
  );
router
  .route('/mien/delivery')
  .get(
    authMiddlewers.restrictTo('delivery'),
    dynamicMiddleware.addQuery('delivery', 'userId'),
    dynamicMiddleware.addQuery('status', 'Out For Delivery'),
    orderController.getAllOrder
  );
router
  .route('/')
  .get(authMiddlewers.restrictTo('admin'), orderController.getAllOrder)
  .post(
    authMiddlewers.restrictTo('user'),
    dynamicMiddleware.addVarBody('user', 'userId'),
    orderController.createOrder
  );
router
  .route('/:id/done')
  .patch(
    authMiddlewers.restrictTo('user'),
    dynamicMiddleware.addVarBody('status', 'Completed'),
    checkMony,
    orderController.updateOrder
  );
router
  .route('/:id/paid')
  .patch(
    authMiddlewers.restrictTo('delivery'),
    dynamicMiddleware.addVarBody('paid', true),
    orderController.updateOrder
  );
router
  .route('/:id')
  .get(authMiddlewers.restrictTo('user', 'admin'), orderController.getOrder)
  .patch(authMiddlewers.restrictTo('admin'), orderController.updateOrder)
  .delete(authMiddlewers.restrictTo('admin'), orderController.deleteOrder);

module.exports = router;
