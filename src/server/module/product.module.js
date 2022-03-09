import query from '../database/basic.database.js';
import productDatabase from '../database/product.database.js'
import error from '../helper/error.js';

/** List the products in type on page  */
 /**
  * @param  {string} categoryId
  * @param  {string} page
  * @param  {string} filter
  * @param  {string} sort
  * @param  {number} maxPrice
  * @param  {number} minPrice
  */
const getProductsByCategory = (categoryId, page, filter, sort, maxPrice, minPrice) => {
    return new Promise((resolve,reject) => {

        const filterOptions={
            filter,
            sort,
            minPrice,
            maxPrice,
            page
        }       

        const dictionaryCondition = {
            expressions: ["Product.Type = ?","OnShelf = ?"],
            parameters:[categoryId,"YES"]
        }    
    
        const getProductsSql = `SELECT Thumbnail,ProductName,Price,ProductID FROM Product `;
        productDatabase.filterProducts(getProductsSql, filterOptions, dictionaryCondition).then((result) => {
            resolve(result);
        }).catch((error) => {reject(error)});  

    
    })    
};

/** Search the products by name*/
/**
  * @param  {string} productName
  * @param  {string} categoryId
  * @param  {string} page
  * @param  {string} filter
  * @param  {string} sort
  * @param  {number} maxPrice
  * @param  {number} minPrice
 */

const searchCategoryProductByName = (productName, categoryId, page, filter, sort, maxPrice, minPrice) => {
    return new Promise((resolve,reject) => {
        const filterOptions={
            filter,
            sort,
            minPrice,
            maxPrice,
            page
        }
        const dictionaryCondition = {
            expressions: ["ProductName Like ?","OnShelf = ?","`Type` = ?"],
            parameters:[`%${productName}%`,"YES",categoryId]
        }    

        const getProductsSql = 'SELECT Thumbnail,ProductName,Price,ProductID FROM Product';
        productDatabase.filterProducts(getProductsSql, filterOptions, dictionaryCondition).then((result) => {
            resolve(result);
        }).catch((error) => {reject(error)});  
       

    })    
};
/**
 * @param  {string} productId
 */
const getProductDetail = (productId) => {
    return new Promise((resolve,reject) => {
        query('SELECT Thumbnail ,ProductName,Price,Stock,Description FROM `Product` WHERE ProductID = ?',[productId]).then((result) => {
            if(result.length > 0){
                resolve(result[0])
            }else{
                reject(error.APIError("查無此商品", new Error()));
            }
        }).catch((error) => {reject(error);})             
    });
};

/**
  * @param  {string} page
  * @param  {string} filter
  * @param  {string} sort
  * @param  {number} maxPrice
  * @param  {number} minPrice
 */
const getProductsBySales = (page, sort, maxPrice, minPrice) => {
    return new Promise((resolve,reject) => {
        const filterOptions={
            filter: "Sales",
            sort,
            minPrice,
            maxPrice,
            page
        }

        const dictionaryCondition = {
            expressions: ["OnShelf = ?"],
            parameters:["YES"]
        }    

        const getProductsSql = 'SELECT Thumbnail,ProductName,Price,ProductID FROM Product';
        productDatabase.filterProducts(getProductsSql, filterOptions, dictionaryCondition).then((result) => {
            resolve(result);
        }).catch((error) => {reject(error)});  
  
    });
};

/**
 * @param  {string} productName
 */
const countProductByCategory = (productName) => {
    return new Promise((resolve,reject) => {
        console.log(productName)
        query(`SELECT TypeName,count(*) as quantity FROM Product LEFT JOIN Type on Type = TypeID WHERE ProductName LIKE ? AND OnShelf = 'Yes' GROUP BY TypeName`,
        [`%${productName}%`]).then((result) => {
            resolve(result)
        }).catch((error) => {reject(error);})             
    });
};



/**
  * @param  {string} productName
  * @param  {string} page
  * @param  {string} filter
  * @param  {string} sort
  * @param  {number} maxPrice
  * @param  {number} minPrice
 */
const searchAllProductByName = (productName, page, filter, sort, maxPrice, minPrice) => {
    return new Promise((resolve,reject) => {
        const filterOptions={
            filter,
            sort,
            minPrice,
            maxPrice,
            page
        }  
        const dictionaryCondition = {
            expressions: ["ProductName Like ?","OnShelf = ?"],
            parameters:[`%${productName}%`,"YES"]
        }    

        const getProductsSql = 'SELECT Thumbnail,ProductName,Price,ProductID FROM Product';
        productDatabase.filterProducts(getProductsSql, filterOptions, dictionaryCondition).then((result) => {
            resolve(result);
        }).catch((error) => {reject(error)});  
    })      
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