import productModule from "../../module/admin/product.module.js";

const addProduct = (req, res, next) => {
    productModule.addProduct(req.body).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const operateProduct = (req, res, next) => {
  productModule.operateProduct(req.params.productId, req.body.onShelf).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const modifyProductData = (req, res, next) => {
  productModule.modifyProductData(req.params.productId, req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const getAllProductStatus = (req, res, next) => {
  productModule.getAllProductStatus().then((result) => {
    res.send(result);
  }).catch((error) => { 
    next(error) 
  });
};

const getAllProduct = (req, res, next) => {
  productModule.getAllProduct(req.query["page"]).then((result) => {
    res.send(result);
  }).catch((error) => { 
    next(error) 
  });
};
export default
{
    addProduct,
    operateProduct,
    modifyProductData,
    getAllProductStatus,
    getAllProduct
}