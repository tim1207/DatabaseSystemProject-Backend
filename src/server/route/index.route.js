import express from "express";
import order from "./order.route.js"
import product from "./product.route.js"
import user from "./user.route.js"
import cart from "./cart.route.js"
import admin from "./admin/index.route.js"
import category from "./category.route.js"
import middleware from "../helper/middleware.js";
const router = express.Router();

router.use("/category", category)
router.use("/products",product);
router.use("/user",user);
router.use(middleware.verifyToken);
router.use(middleware.checkIsBan);
router.use("/orders",order);
router.use("/cart",cart);
router.use("/admin",admin);

export default router;
