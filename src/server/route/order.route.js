import express from "express";
import orderController from "../controller/order.controller.js";
import middleware from "../helper/middleware.js";

const router = express.Router();

// find by user id 
router.get("/", orderController.getOrders);

// 建立訂單
router.post('/', middleware.checkStock, orderController.createOrder);

// 取消訂單
router.delete("/:orderId", orderController.deleteOrder);

// 查詢訂單詳細資料
router.get("/:orderId/detail", orderController.getOrderDetail);

export default router;