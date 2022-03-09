import userController from "../../controller/admin/user.controller.js";
import express from "express";


const router = express.Router();

//停/復權用戶
router.put('/:userId/operate', userController.modifyUser); 

router.get('/', userController.getUsers ); 

router.get("/status", userController.getAllUserStatus);
export default router;