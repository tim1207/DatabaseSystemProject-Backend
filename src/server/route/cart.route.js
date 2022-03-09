import express from "express";
import cartController from "../controller/cart.controller.js";

const router = express.Router();
router.get("/", cartController.getCart);
//delete
router.delete("/", cartController.removeProduct); 

//TODO: 要判斷同商品同user ID 要合併
//post the product into shoppingCart
router.post("/", cartController.putProduct); 

router.put("/", cartController.modifyProductQuantity); 

export default router;
