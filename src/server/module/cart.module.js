import query from '../database/basic.database.js';
import error from '../helper/error.js';
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 */
const getCart = (user) => {
    return new Promise((resolve,reject) => {
        query("SELECT ProductID, ProductName, Thumbnail, Price, Stock, Quantity FROM ShoppingCart NATURAL JOIN Product WHERE ShoppingCart.MemberID = ? ", user.id).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    });
};

/** User put the product to the shopping cart */
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {object} values
 * @param  {number} values.productId
 * @param  {number} values.quantity
 */
const putProduct = (user, values) => {
    return new Promise((resolve, reject) => {
        query('SELECT Stock FROM Product WHERE ProductID = ?', [values.productId]).then((result) => {
            let stock;
            if(result.length > 0 ){
                stock = Number(result[0].Stock);
            }else{
                reject(error.APIError("這是一個不存在的商品", new Error()));
            }
            
            if (stock >= values.quantity) {
                query("SELECT * FROM ShoppingCart WHERE MemberID = ? AND ProductID = ?", [user.id, values.productId]).then((result) => {
                    if (result.length === 0) {
                        query('INSERT INTO `ShoppingCart` (`MemberID`, `ProductID`, `Quantity`) VALUES (?,?,?)', [user.id, values.productId, values.quantity]).then(() => {
                            resolve({
                                code: 200,
                                message: "放置購物車成功",
                            });
                        }).catch((error) => {
                            reject(error);
                        })

                    } else {
                        query('UPDATE `ShoppingCart` SET Quantity = Quantity + ?  WHERE MemberID = ? AND ProductID = ?', [values.quantity, user.id, values.productId]).then(() => {
                            resolve({
                                code: 200,
                                message: "商品數量增加成功",
                            });
                        }).catch((error) => {
                            reject(error);
                        })
                    }
                }).catch((error) => {
                    reject(error);
                })
            } else {
                reject(error.APIError("商品庫存不足", new Error()));
            }
        }).catch((error) => {
            reject(error);
        });


    })
}

/** User remove the product to the shopping cart */
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {object} values
 * @param  {string} values.productId
 */
 const removeProduct = (user, values) => {
    return new Promise((resolve, reject) => {
        query('DELETE FROM ShoppingCart WHERE MemberID =? and ProductID =?', [user.id, values.productId]).then((result) => {
            resolve({
                code: 200,
                message: "移除成功",
            });
        }).catch((error) => {
            reject(error);
        });
    })
}

/** User modify the quantity of product in shopping cart */
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {object} values
 * @param  {string} values.productId
 * @param  {number} values.quantity
 */
const modifyProductQuantity = (user, values) => {
    return new Promise((resolve, reject) => {
        query('SELECT Stock FROM Product WHERE ProductID = ?', [values.productId]).then((result) => {

            let stock;
            if(result.length > 0 ){
                stock = Number(result[0].Stock);
            }else{
                reject(error.APIError("這是一個不存在的商品", new Error()));
            }
            query("SELECT * FROM ShoppingCart WHERE MemberID = ? AND ProductID = ?", [user.id, values.productId]).then((result) => {
                if (result.length === 0) {
                    reject(error.APIError("購物車內並無此商品", new Error()));
                } else {
                    if (stock >= values.quantity) {               
                        query('UPDATE `ShoppingCart` SET Quantity = ? WHERE MemberID = ? AND ProductID = ? ', [values.quantity, user.id, values.productId]).then((result) => {
                            resolve({
                                code: 200,
                                message: "商品數量更改成功",
                            });
                        }).catch((error) => {
                            reject(error);
                        });
                    } else {
                        reject(error.APIError("商品庫存不足", new Error()));
                    }
                  
                }
            }).catch((error) =>{reject(error);});
           
        }).catch((error) => {
            reject(error);
        });
    })
}

export default {
    getCart,
    putProduct,
    removeProduct,
    modifyProductQuantity
};