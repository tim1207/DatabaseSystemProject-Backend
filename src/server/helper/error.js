import config from "../../config/config.js"
import httpStatus from "http-status"
function APIError(message, error){
    return {
        message,
        status: httpStatus.BAD_REQUEST,
        isDev: config.env === "development",
        code: 400,
        stack: error.stack
    }
}
function MySQLError(error){
    return {
        message: error.message,
        sql: error.sql,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        isDev: config.env === "development",
        code: 500,
        stack: error.stack
    }
}
export default {
    APIError,
    MySQLError
}