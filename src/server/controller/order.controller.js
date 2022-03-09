import orderModule from "../module/order.module.js";

const getOrders = (req, res, next) => {
  orderModule.getOrdersByID(req.user, req.query["page"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const createOrder = (req, res, next) => {
  // 成立訂單
  orderModule.createOrder(req.user, req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const deleteOrder = (req, res, next) => {
  // 刪除訂單
  orderModule.deleteOrder(req.user, req.params.orderId).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const getOrderDetail = (req, res, next) => {
  // 查看訂單
  orderModule.getOrderDetail(req.user, req.params.orderId).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

export default 
{
  getOrders,
  createOrder,
  deleteOrder,
  getOrderDetail
}