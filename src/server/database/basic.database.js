//import apiError from "../helper/apiError.js";
import mysql from "mysql8"
import config from "../../config/config.js";
import error from "../helper/error.js";
const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase,
    port: config.mysqlPort
});
/**
 * 
 * @typedef {Object} MysqlResult
 * @property {Number} fieldCount
 * @property {Number} affectedRows
 * @property {Number} insertId
 * @property {Number} serverStatus
 * @property {Number} warningCount
 * @property {Number} changedRows
 * @property {String} message
 * @property {boolean} protocol41
 */

/**
 * @param  {string} queryString
 * @param  {Array|String} queryParameter

 * @returns { Promise<MysqlResult|Array>}
 */
function query(queryString, queryParameter){
    return new Promise( (resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
            if (connectionError) {                
                reject(error.MySQLError(connectionError)); 
            } else {

                connection.query( 
                    queryString,
                    Array.isArray(queryParameter) ? queryParameter : [queryParameter], 
                    (_error, result) => {
                        if (_error) {
                            reject(error.MySQLError(_error)); 
                        } else {
                            resolve(result);
                        }
                        connection.release();
                    }
                );
            }
        })
    })
}

export default query;
