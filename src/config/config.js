import Joi from 'joi';
import dotenv from "dotenv";
import nodemailer from 'nodemailer'
dotenv.config();

// require and configure dotenv, will load vars in .env in process.env
//require('dotenv').config();

const envVarSchema = Joi.object().keys({
  NODE_ENV: Joi.string().default('development'),
  PORT: Joi.number().default(8080), // 數字且預設值為 8080
  MYSQL_PORT: Joi.number().default(3306), //數字且預設值為3306
  MYSQL_HOST: Joi.string().default('127.0.0.1'), //字串取預設值為127.0.0.1
  MYSQL_USER: Joi.string(), // 字串
  MYSQL_PASS: Joi.string(), // 字串
  MYSQL_NAME: Joi.string(), // 字串
  VERSION: Joi.string(),
  SECRET_KEY: Joi.string(),
  MAILUSER: Joi.string(),
  MAILPASS: Joi.string()

}).unknown().required();

// console.log(process.env)
// console.log(process.env.VERSION)
// console.log(process.env.NODE_ENV)
// console.log(process.env.PORT)
// console.log(process.env.MYSQL_PORT)
// console.log(process.env.MYSQL_HOST)
// console.log(process.env.MYSQL_USER)
// console.log(process.env.MYSQL_PASS)
// console.log(process.env.MYSQL_DATABASE)
// console.log(process.env.SECRET_KEY)

// process.env 撈取 .env 內的變數做 joi 驗證
const validation = envVarSchema.validate(process.env);


if (validation.error) {
    console.log("error")
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars = validation.value
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: envVars.MAILUSER,
    pass: envVars.MAILPASS
  }
});
const config = {
  version: envVars.VERSION, // API版本
  env: envVars.NODE_ENV, // 開發模式(development、production)
  port: envVars.PORT, // API 阜號
  mysqlPort: envVars.MYSQL_PORT, // 連接阜號(MYSQL_PORT)
  mysqlHost: envVars.MYSQL_HOST, // 主機名稱 (MYSQL_HOST)
  mysqlUserName: envVars.MYSQL_USER, // 用戶名稱 (MYSQL_USER)
  mysqlPass: envVars.MYSQL_PASS, // 資料庫密碼(MYSQL_PASS)
  mysqlDatabase: envVars.MYSQL_DATABASE,
  secretKey: envVars.SECRET_KEY,
  mailService: transporter,
  mailUser: envVars.MAILUSER

};
console.log(config.mysqlPass)

export default config; // 匯出共用
