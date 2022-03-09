import express from "express";
import productController from "../controller/product.controller.js";
const router = express.Router();

//product
// 以類別顯示商品
router.get('/category/:categoryId', productController.getProductsByCategory ); 

//查詢各類別商品
// localhost:3000/api/products/search/categories?productName= & page=
router.get('/search/category/:categoryId', productController.searchCategoryProductByName ); 

//用名字搜尋總類別
//localhost:3000/api/products/search?productName= & page=
router.get("/search",productController.searchAllProductByName);

//查詢暢銷商品
// localhost:3000/api/products/sales
router.get("/sales",productController.getProductsBySales);

//查詢各類別商品有多少 by name
//localhost:3000/api/products/search/category
router.get("/search/category",productController.countProductByCategory);

//查詢商品詳細資料
router.get("/:productId",productController.getProductDetail);



export default router;