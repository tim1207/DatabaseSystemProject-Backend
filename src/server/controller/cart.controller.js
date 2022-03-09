import cartModule from "../module/cart.module.js";

const getCart = (req, res, next) => {
  cartModule.getCart(req.user).then((result) => {
    res.send(result);
  }).catch((error) => {next(error);});
}

const putProduct = (req, res, next) => {
    // 放入購物車
    cartModule.putProduct(req.user, req.body).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
  };

  const removeProduct = (req, res, next) => {
    // 放入購物車
    cartModule.removeProduct(req.user, req.body).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
  };

  const modifyProductQuantity = (req, res, next) => {
    // 放入購物車
    cartModule.modifyProductQuantity(req.user, req.body).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
  };
  
export default
{
    putProduct,
    removeProduct,
    modifyProductQuantity,
    getCart
}