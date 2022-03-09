import express from "express";
import orderController from "../../controller/admin/order.controller.js";
const router = express.Router();

//find all
router.get('/',orderController.getOrders); 

router.get('/status',orderController.getAllOrderStatus); 

//modify orders cancel
router.put('/:orderId/:status',orderController.modifyOrder); 

export default router;