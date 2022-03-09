import userModule from "../module/user.module.js";

/* User  POST 登入(Login) */
const userLogin = (req, res, next) => {
    // 取得帳密
    userModule.Login(req.body).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};
  
/* User  findPassword */
const resetPassword = (req, res, next) => {
  userModule.resetPassword(req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

/** User register */
const userRegister = (req, res, next) => {
  userModule.Register(req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

/** User add credit card */
const addCreditCard = (req, res, next) => {
  userModule.addCreditCard(req.user,req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

/** List User's credit card */
const findCreditCard = (req, res, next) => {
  userModule.findCreditCard(req.user,req.query["page"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

/** delete User's credit card */
const deleteCreditCard = (req, res, next) => {
  userModule.deleteCreditCard(req.user,req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const getInformation = (req, res ,next) => {
  userModule.getInformation(req.user).then((result) => {
    res.send(result);
  }).catch((error) => {
    next(error);
  })
}

/** modify User's information */
const modifyInformation = (req, res, next) => {
  userModule.modifyInformation(req.user,req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

/** modify User's password */
const modifyPassword = (req, res, next) => {
  userModule.modifyPassword(req.user,req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

export default 
{
  userLogin,
  resetPassword,
  userRegister,
  addCreditCard,
  findCreditCard,
  deleteCreditCard,
  getInformation,
  modifyInformation,
  modifyPassword
}
