import config from '../../config/config.js';
import jwt from 'jsonwebtoken';
import error from '../helper/error.js';
import query from '../database/basic.database.js';
import { nanoid } from 'nanoid';
/*  User GET (Login)登入取得資訊  */
/**
 * @param  {object} values
 * @param  {string} values.account
 * @param  {string} values.password
 */
const Login = (values) => {
    return new Promise((resolve,reject) => {
        query("SELECT * FROM Member WHERE Account = ?", values.account).then((result) => {
            if(result.length > 0) {
                    const queryPassword = result[0].Password; 
                    const userPassword = values.password; 
                    if (queryPassword === userPassword) {
                        // 產生 JWT
                        const payload = {
                            user_id: result[0].MemberID,
                            user_name: result[0].Name,
                            user_mail: result[0].Email
                        };
                        const isAdmin = result[0].isAdmin ? true : false;
                        // 取得 API Token
                        const token = jwt.sign({ payload, exp: Math.floor(Date.now() / 1000) + (86400 * 365) }, config.secretKey);
                        resolve({ 
                            code: 200,
                            message: '登入成功',
                            token,
                            isAdmin 
                        }); 
                    } else {
                        reject(error.APIError("輸入的密碼有誤", new Error())); 
                    }          
            }else{
                reject(error.APIError("輸入的帳號不存在", new Error())); 
            }
        }).catch((error) => {reject(error);})
        
    })
};

/*  User resetPassword   */
/**
 * @param  {object} value
 * @param  {string} value.email
 * @param  {string} value.account
 */
const resetPassword = (value) => {
    return new Promise((resolve,reject) => {
        const newPassword = nanoid(16)
        query("UPDATE Member SET Password = ? WHERE Email = ? AND Account = ?", [newPassword, value.email, value.account]).then((result) => {
            if(result.affectedRows === 0 ){
                reject(error.APIError("找不到此信箱或帳號", new Error()))
            }
            const mailOptions = {
                from: config.mailUser,
                to: value.email,
                subject: '密碼重置請求',
                text: '您好！\r\n這是您的新密碼:'+ newPassword
            };
            config.mailService.sendMail(mailOptions, (error, info) => {
                if(error){
                    reject(error);
                }
                resolve({
                    code: 200,
                    message: `已將新的密碼送至 ${value.email}`
                })
            });
        }).catch((error) => {
            reject(error)
        })
        // query('SELECT Password FROM Member  WHERE Email = ?',value.email ).then((result) => {
        //     if(result.length > 0 ){
        //         resolve(result[0]); 
        //     }else{
        //         reject(error.APIError("查無此email", new Error()));
        //     }
        // }).catch((error) => {reject(error);})
    })

};

/** User Register */
/**
 * @param  {object} values
 * @param  {string} values.email
 * @param  {string} values.account
 * @param  {string} values.password
 * @param  {string} values.name
 */
const Register = (values) => {
    return new Promise((resolve,reject) => {
        console.log(values);
        query("SELECT * FROM Member WHERE Account = ? OR Email = ?", [values.account,values.email]).then((result) => {
            if (Object.keys(result).length === 0) {
                query('INSERT INTO `Member`(`Email`, `Account`, `Password`, `Name`) VALUES (?, ?, ?, ?)',
                    [values.email, values.account, values.password, values.name]).then((result) => {
                        const payload = {
                            user_id: result.insertId,
                            user_name: values.name,
                            user_mail: values.email
                        };
                        const token = jwt.sign({ payload, exp: Math.floor(Date.now() / 1000) + (86400 * 365) }, config.secretKey);

                        resolve({ 
                            code: 200,
                            message: '註冊成功',
                            token 
                        });  
                    }).catch((error) => {reject(error);})
            } else {
                reject(error.APIError("註冊失敗", new Error())); 
            }
        }).catch((error) => {reject(error);})
    });
};

/** User add the credit card */
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {object} credit
 * @param  {string} credit.cardNumber
 * @param  {string} credit.securityCode
 * @param  {number} credit.month
 * @param  {number} credit.year
 */
const addCreditCard = (user,credit) => {
    return new Promise((resolve,reject) => {
        query("SELECT * FROM `CreditCard` WHERE CreditCardNumber = ? AND SecurityCode = ?", [credit.cardNumber,credit.securityCode]).then((result) => {
            if (result.length === 0) {
                query('INSERT INTO `CreditCard`(`CreditCardNumber`, `MemberID`, `ExpireYear`, `ExpireMonth`, `SecurityCode`) VALUES (?, ?, ?, ?, ?)',
                    [credit.cardNumber, user.id, credit.year, credit.month, credit.securityCode]).then(() => {
                        resolve({ 
                            code: 200, 
                            message: '新增成功', 
                        });  
                    }).catch((error) => {reject(error)});
            } else {
                reject(error.APIError("新增失敗", new Error())); 
            }
        }).catch((error) => {reject(error);})
    });
}

/** List the credit card by MemberID */
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {number} page
 */
const findCreditCard =(user,page)=>{
    return new Promise((resolve,reject) => {
        if(page === undefined || page === "")
            page = 1
        const dataPerPage = 50
        const minLimit = (Number(page) - 1) * dataPerPage  
        query('SELECT CreditCardNumber,ExpireYear,ExpireMonth,SecurityCode FROM `CreditCard` WHERE `MemberID` =?  LIMIT ?,?', [user.id, minLimit, dataPerPage]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);});
    }) 
}

/** User delete the credit card */
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {object} value
 * @param  {string} value.cardNumber
 */
const deleteCreditCard =(user,value)=>{
    return new Promise((resolve,reject) => {
        console.log (value.cardNumber);
        query('DELETE FROM `CreditCard` WHERE `MemberID` = ?  AND `CreditCardNumber` = ? ', [user.id, value.cardNumber]).then((result) => {
            resolve({ 
                code: 200, 
                message: '刪除成功', 
            });  
        }).catch((error) => {reject(error);});
    }) 
}
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 */
const getInformation = (user) => {
    return new Promise((resolve, reject) => {
        query("SELECT `Name`,Phone,Email,Address,isAdmin FROM Member WHERE MemberID = ?" , user.id).then((result) => {
            const response = result[0];
            response.isAdmin = response.isAdmin ? true : false;
            resolve(result[0]);
        }).catch((error) => {
            reject(error);
        })
    });
}

/** User modify the information */
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {object} value
 * @param  {string} value.email
 * @param  {string} value.name
 * @param  {string} value.address
 * @param  {string} value.phone
 */
const modifyInformation = (user,value) =>{
    return new Promise((resolve,reject) => {
        query('UPDATE `Member` SET Email = ? , Name = ? ,Address = ? ,Phone = ? WHERE `MemberID` = ? ', [value.email, value.name, value.address, value.phone, user.id,]).then((result) => {
            resolve({ 
                code: 200, 
                message: '修改成功', 
            });  
        }).catch((error) => {reject(error);});
    }) 
}

/** User modify the password */
/**
 * @param  {object} user
 * @param  {Number} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {object} value
 * @param  {string} value.oldPassword
 * @param  {string} value.newPassword
 */
 const modifyPassword = (user,value) =>{
    return new Promise((resolve,reject) => {
        query("SELECT * FROM `Member` WHERE MemberID = ? AND Password = ?", [user.id, value.oldPassword]).then((result) => {
            if (result.length === 0) {
                reject(error.APIError("舊密碼錯誤", new Error()));
            } else {               
                 query('UPDATE `Member` SET Password = ? WHERE MemberID = ?',
                    [value.newPassword,user.id]).then(() => {
                        resolve({ 
                            code: 200,
                            message: '修改成功', 
                        });  
                    }).catch((error) => {reject(error)});
            }
        }).catch((error) => {reject(error);})
    });
}

export default {
    Login,
    resetPassword ,
    Register,
    addCreditCard,
    findCreditCard,
    deleteCreditCard,
    getInformation,
    modifyInformation,
    modifyPassword
};