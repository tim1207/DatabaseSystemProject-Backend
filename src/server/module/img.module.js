import query from "../database/basic.database.js";
import error from "../helper/error.js";
const loadImg = (filename) => {
    return new Promise((resolve,reject) => {
        query("SELECT img,mimetype FROM `Image` WHERE filename = ?", [filename]).then((result) => {
            if(result.length > 0)
                resolve(result[0]);
            reject(error.APIError("找不到圖片", new Error()));
        }).catch((error) => {
            reject(error);
        })
    })
}


export default {
    loadImg
}
