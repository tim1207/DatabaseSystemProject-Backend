import productModule from "../module/product.module.js";

const getProductsByCategory = (req, res, next) => {
  productModule.getProductsByCategory(req.params.categoryId, req.query["page"], req.query["filter"], req.query["sort"], req.query["maxPrice"], req.query["minPrice"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const searchCategoryProductByName = (req, res, next) => {
  productModule.searchCategoryProductByName(req.query["productName"], req.params.categoryId, req.query["page"], req.query["filter"], req.query["sort"], req.query["maxPrice"], req.query["minPrice"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const getProductDetail = (req, res, next) => {
  productModule.getProductDetail(req.params.productId).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const getProductsBySales = (req, res, next) => {
  productModule.getProductsBySales(req.query["page"], req.query["sort"], req.query["maxPrice"], req.query["minPrice"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const countProductByCategory = (req, res, next) => {
  productModule.countProductByCategory(req.query["productName"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};
const searchAllProductByName = (req, res, next) => {
  productModule.searchAllProductByName(req.query["productName"], req.query["page"],req.query["filter"],req.query["sort"],req.query["maxPrice"],req.query["minPrice"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

export default 
{
  getProductsByCategory,
  searchCategoryProductByName,
  getProductDetail,
  getProductsBySales, 
  countProductByCategory,
  searchAllProductByName
}