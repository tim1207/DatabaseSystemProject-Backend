import imgModule from "../../module/admin/img.module.js";
import error from "../../helper/error.js";

const uploadImg = (req, res, next) => {
    const { file } = req
    if (file) {
        imgModule.uploadImage(file, req.headers["host"]).then((result) => {
            res.json(result);
        }).catch((error) => {
            next(error)
        })
    } else {    
        next(error.APIError("請選擇圖片", new Error()));
    }
}

export default
{
    uploadImg
}