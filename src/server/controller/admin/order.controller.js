import orderModule from "../../module/admin/order.module.js";

const getOrders = (req, res, next) => {
  orderModule.getOrderList(req.query["page"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const modifyOrder = (req, res, next) => {
  orderModule.modifyOrder(req.params.orderId, req.params.status).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const getAllOrderStatus = (req, res, next) => {
  orderModule.getAllOrderStatus().then((result) => {
    res.send(result); 
  }).catch((error) => { 
    next(error) 
  }); 
}

export default{
  getOrders,
  modifyOrder,
  getAllOrderStatus
}