import query from '../database/basic.database.js';
import error from '../helper/error.js';
import date from "date-and-time"
/** Search the orders by memberID*/
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {string} page
 */
 const getOrdersByID = (user, page) => {
    return new Promise((resolve,reject) => {
        if(page === undefined || page === "")
            page = 1
        const dataPerPage = 20
        const minLimit = (Number(page) - 1) * dataPerPage
        query('SELECT COUNT(*) as _count FROM `Order` WHERE MemberID = ? ',[user.id]).then((result)=>{
            const total = Number(result[0]._count);
            const pages = Math.ceil(total / dataPerPage);
            query('SELECT OrderID,Date,Total,StatusType FROM `Order` LEFT JOIN `OrderStatus` ON `Order`.`OrderStatus` = `OrderStatus`.`OrderStatusID` WHERE MemberID = ?  LIMIT ?,?', [user.id, minLimit, dataPerPage]).then((result) => {
                resolve({ 
                    result,
                    total,
                    pages
                }); 
            }).catch((error) => {reject(error);});
        }).catch((error) => {reject(error);});
    })    
};

/** User buy product */
/**
 * @param  {object} user
 * @param  {string} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {object} values
 * @param  {object[]} values.products
 * @param  {Number} values.products.productId
 * @param  {Number} values.products.quantity
 * @param  {Number} values.paymentMethod
 */
 const createOrder = (user, values) => {
    

    // let total = 0;
    // values.price.forEach((num, index) => {
    //     total += (values.price[index]) * (values.quantity[index]);
    // });
    return new Promise(async (resolve,reject) => {
        let totalPrice = 0;
        for(let i = 0 ; i < values.products.length; i++){
            await query('SELECT Price FROM `Product` WHERE ProductID = ? AND OnShelf = "Yes"', values.products[i].productId).then((result) => {
                if(result.length > 0){
                    totalPrice += result[0].Price * values.products[i].quantity         
                }else{
                    reject(error.APIError("建立訂單失敗", new Error()));
                }
            }).catch((error) => {reject(error);});
        }
    
        const now = date.format(new Date(), "YYYY/MM/DD hh:mm:ss")
        query('INSERT INTO `Order` (`MemberID`,`Date`, `Total`, `OrderStatus`, `PaymentMethod`) VALUES (?, ?, ?, ?, ?)',
            [user.id, now, totalPrice, 3, values.paymentMethod]).then((result) => {
                const orderId = result.insertId;
                let sql = 'INSERT INTO `OrderDetail` (`OrderID`,`ProductID`, `Quantity`) values';
                const parameterBracket = [];
                const parameters = [];
                values.products.forEach((element) => {
                    parameterBracket.push("(?,?,?)");
                    parameters.push(orderId, element.productId , element.quantity);
                    query('UPDATE  `Product` SET Sales = Sales + ?, Stock = Stock - ? WHERE ProductID = ?',[ element.quantity, element.quantity, element.productId])
                    .catch((error) => {
                        reject(error);
                    });
                })
                query(sql+ parameterBracket.join(","),
                parameters).then((result) => {
                    resolve({
                        code: 200,
                        message: "購買成功",
                    });
                }).catch((error) => {
                    reject(error);
                });
        }).catch((error) => {reject(error);});
    });
};

/** User delete the order */
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {string} orderId
 */
const deleteOrder = (user, orderId) =>{
    return new Promise((resolve,reject) => { 
        query('UPDATE `Order` SET OrderStatus = 2 WHERE OrderID = ? AND MemberID = ?', [orderId, user.id]).then(() => {
            query('UPDATE Product,OrderDetail \
            SET Product.Stock = Product.Stock + OrderDetail.Quantity, \
            Product.sales = Product.sales - OrderDetail.Quantity\
            WHERE Product.ProductID = OrderDetail.ProductID AND OrderID = ?',[orderId])
            .then(() =>{
                resolve({ 
                    code: 200,
                    message: '取消成功', 
                });
            }).catch((error) => {reject(error);})
        }).catch((error) => {reject(error);})
    })    
}

/** User check the order detail */
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {string} orderId
 */
// TODO: 需join orderStatus
const getOrderDetail = (user, orderId) =>{
    return new Promise((resolve,reject) => { 
        query('SELECT Product.ProductName, o.Quantity, Product.Price FROM (SELECT ProductID,Quantity FROM `Order` LEFT JOIN OrderDetail ON `Order`.OrderID = OrderDetail.OrderID WHERE MemberID = ? AND `Order`.OrderID = ?) AS o LEFT JOIN Product ON o.ProductID = Product.ProductID', 
        [user.id, orderId]).then((result) => {
            resolve(result);
        }).catch((error) => {reject(error);})
    })    
}

export default 
{
    getOrdersByID,
    createOrder,
    deleteOrder,
    getOrderDetail
}