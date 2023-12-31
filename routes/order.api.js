const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const orderController = require("../controllers/order.controller");
const { validate } = require("../models/product");
const validators = require("../middlewares/validators");
const authentication = require("../middlewares/authentication");

/**
 * @route GET /orders/stats
 * @description Get order stats
 * @access Admin Login required
 */
router.get("/stats", orderController.getOrderStats);

/**
 * @route POST /orders
 * @description Create an order
 * @body { userId, products, subtotal, total, shipping, delivery_status, payment_status }
 * @access Public
 */
router.post("/", orderController.createOrder);

/**
 * @route PUT /orders/:orderId
 * @description Update an order - Admin only
 * @body { userId, products, subtotal, total, shipping, delivery_status, payment_status }
 * @access Login required
 */
router.put(
  "/:orderId",
  authentication.isAdmin,
  validators.validate([
    param("orderId").exists().isString().custom(validators.checkObjectId)
  ]),
  orderController.updateOrder
);

/**
 * @route DELETE /orders/admin/:orderId
 * @description Delete an order - Admin only
 * @access Login required
 */
router.put(
  "/:orderId",
  authentication.isAdmin,
  validators.validate([
    param("orderId").exists().isString().custom(validators.checkObjectId)
  ]),
  orderController.deleteOrder
);

/**
 * @route GET /orders
 * @description Get all orders - Admin only
 * @access Login required
 */
router.get("/", authentication.isAdmin, orderController.getAllOrders);

/**
 * @route GET /orders/find/:userId
 * @description Track a user orders
 * @access Login required
 */
router.get(
  "/find/:userId",
  authentication.loginRequired,
  validators.validate([
    param("userId").exists().isString().custom(validators.checkObjectId)
  ]),
  orderController.getSingleUserOrders
);

/**
 * @route GET /orders/:orderId
 * @description Get an order
 * @access Login required
 */
router.get(
  "/:orderId",
  authentication.loginRequired,
  validators.validate([
    param("orderId").exists().isString().custom(validators.checkObjectId)
  ]),
  orderController.getAnOrder
);

module.exports = router;
