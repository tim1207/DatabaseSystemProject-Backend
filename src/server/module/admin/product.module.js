import query from '../../database/basic.database.js';
import error from '../../helper/error.js';

/** Admin hit the product on the shelf */
/**
 * @param  {object} product
 * @param  {string} product.name
 * @param  {Number} product.price
 * @param  {string} product.thumbnail
 * @param  {string} product.description
 * @param  {Number} product.type
 * @param  {Number} product.stock
 */
 const addProduct = (product) => {
    return new Promise((resolve,reject) => {
        query('INSERT INTO `Product`(`ProductName`, `Price`, `Thumbnail`, `Description`, `Sales` , `Type`, `Stock`, `OnShelf`) VALUES (?, ?, ?, ?, ?, ?, ?, ? )',
        [product.name, product.price, product.thumbnail, product.description, 0, product.type, product.stock, "Yes"]).then(() => {
            resolve({
                code: 200,
                message: "商品上架成功",
            })
        }).catch((error) => {reject(error);})             
    });t
};

/**
 * @param  {string} productId
 * @param  {boolean} onShelf
 */
const operateProduct = (productId, onShelf) => {
    return new Promise((resolve,reject) => {
        if(onShelf === undefined)
            reject(error.APIError("商品操作失敗", new Error()));
        const shelfStatus = onShelf ? "Yes" : "No";

        query('UPDATE  `Product` SET OnShelf = ? WHERE ProductID = ?',
        [shelfStatus,productId]).then(() => {
            resolve({
                code: 200,
                message: onShelf ? "商品重新上架成功" : "商品下架成功",
            })
        }).catch((error) => {reject(error);})             
    });
};

/**
 * @param  {string} id
 * @param  {object} values
 * @param  {Number} values.price
 * @param  {string} values.thumbnail
 * @param  {string} values.description
 * @param  {Number} values.stock
 */
 const modifyProductData = (id, values) => {
    return new Promise((resolve,reject) => {
        query('UPDATE  `Product` SET Price = ?, Thumbnail = ?, Description = ?, Stock = ? WHERE ProductID = ?',
        [values.price, values.thumbnail, values.description, values.stock, id]).then(() => {
            resolve({
                code: 200,
                message: "商品資訊更新成功",
            })
        }).catch((error) => {reject(error);})             
    });
};

const getAllProductStatus = () =>{
    return new Promise((resolve,reject) => {
        query("SELECT OnShelf,COUNT(OnShelf) AS 'total' FROM Product GROUP BY OnShelf").then((result) => {
            resolve(result)
        }).catch((error) => {
            reject(error);
        });
    });
};
/**
 * @param  {string} page
 */
const getAllProduct = (page) =>{
    return new Promise((resolve,reject) => {
        if(page === undefined || page === "")
            page = 1
        const dataPerPage = 50;
        const minLimit = (Number(page) - 1) * dataPerPage;
        query("SELECT COUNT(*) AS COUNT FROM Product").then((result) => {
            const total = Number(result[0].COUNT);
            const pages = Math.ceil(total / dataPerPage);
            query("SELECT ProductID,ProductName,Price,Thumbnail,Stock,OnShelf FROM Product limit ?,?", [minLimit, dataPerPage]).then((result) => {
                resolve({
                    result,
                    total,
                    pages
                })
            }).catch((error) => {
                reject(error);
            });
        }).catch((error) => {
            reject(error);
        });
        
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
