import userModule from "../../module/admin/user.module.js";

const getUsers = (req, res, next) => {
  userModule.listUser(req.query["page"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const modifyUser = (req, res, next) => {
  userModule.modifyUserStatus(req.params.userId, req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const getAllUserStatus = (req, res, next) => {
  userModule.getAllUserStatus().then((result) => {
    res.send(result); 
  }).catch((error) => { next(error) });
};

export default 
{
  getUsers,
  modifyUser,
  getAllUserStatus
}