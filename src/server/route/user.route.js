import userController from "../controller/user.controller.js";
import express from "express";
import middleware from "../helper/middleware.js";


const router = express.Router();

//註冊會員
router.post('/register', userController.userRegister);

//會員登入
router.post('/login', userController.userLogin ); 

//TODO:
//暫時不用
router.post('/resetPassword', userController.resetPassword ); 

router.use(middleware.verifyToken);
router.use(middleware.checkIsBan);
//改密碼
router.put('/password', userController.modifyPassword );

router.get("/information", userController.getInformation);

//改個資
router.put('/information', userController.modifyInformation );

//新增信用卡
router.post('/creditCard', userController.addCreditCard );

//查詢信用卡
router.get('/creditCard', userController.findCreditCard );

//刪除信用卡
router.delete('/creditCard', userController.deleteCreditCard );

export default router;