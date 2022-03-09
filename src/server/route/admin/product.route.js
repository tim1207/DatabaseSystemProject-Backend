import productController from "../../controller/admin/product.controller.js";
import express from "express";

const router = express.Router();

router.get("/status", productController.getAllProductStatus)

//上架商品
router
    .get("/" , productController.getAllProduct)
    .post('/', productController.addProduct)

//操作商品上下架
router.put("/:productId/operate",productController.operateProduct);

//更新商品
router.put("/:productId",productController.modifyProductData);

export default router;