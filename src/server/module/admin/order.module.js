import query from '../../database/basic.database.js';
import error from '../../helper/error.js';

/** List the orders on page  */
/**
 * @param  {string} page
 */
 const getOrderList = (page) => {
    return new Promise((resolve,reject) => {
        if(page === undefined || page === "")
            page = 1
        const dataPerPage = 50
        const minLimit = (Number(page) - 1) * dataPerPage ;
        query('SELECT COUNT(*) as _count FROM `Order` ').then((result)=>{
            const total = Number(result[0]._count);
            const pages = Math.ceil(total / dataPerPage);
            query('SELECT * FROM `Order`  LIMIT ?,?', [minLimit, dataPerPage]).then((result) => {
                resolve({ 
                    result,
                    total,
                    pages,
                }); 
            }).catch((error) => {reject(error);});
        }).catch((error) => {reject(error);});
    })
        
};

 /**
  * @param  {string} orderId
  * @param  {string} status
  */
 const modifyOrder = (orderId, status) => {
    return new Promise((resolve,reject) => { 
        if(status === "finish"){
            query('UPDATE `Order` SET OrderStatus = 1 WHERE OrderID = ?', [orderId]).then(() => {     
                resolve({ 
                    code: 200,
                    message: '訂單交易成功', 
                });
            }).catch((error) => {reject(error);})
        }else if(status === "cancel"){
            query('UPDATE `Order` SET OrderStatus = 2 WHERE OrderID = ? AND OrderStatus != 2', [orderId]).then((result) => {               
                if(result.affectedRows > 0 ){
                    query('UPDATE Product,OrderDetail SET Product.Stock = Product.Stock + OrderDetail.Quantity WHERE Product.ProductID = OrderDetail.ProductID AND OrderID = ?',[orderId])
                    .then(() =>{
                        resolve({ 
                            code: 200,
                            message: '訂單取消成功', 
                        });
                    }).catch((error) =>{reject(error);});  
                }else{
                    reject(error.APIError("訂單取消失敗", new Error()));
                }
            }).catch((error) => {reject(error);})
        }else{
            reject(error.APIError("訂單操作失敗", new Error()));
        }
    })     
};

const getAllOrderStatus = () => {
    return new Promise((resolve,reject) => {
        query("SELECT StatusType,COUNT(StatusType) AS 'total'  FROM `Order` LEFT JOIN OrderStatus ON `Order`.OrderStatus = OrderStatus.OrderStatusID GROUP BY StatusType ")
        .then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
}

export default{
    getOrderList,
    modifyOrder,
    getAllOrderStatus
}