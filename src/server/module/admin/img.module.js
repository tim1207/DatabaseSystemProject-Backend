import query from "../../database/basic.database.js";
import {customAlphabet} from 'nanoid'
/**
 * @param  {} file
 * @param  {string} host
 */
const uploadImage = (file, host) => {
    return new Promise((resolve,reject) => {
        
        const filename = customAlphabet("0123456789abcdef",32)()
        query("INSERT INTO `Image` values(?,?,?)", [filename, file.mimetype, file.buffer]).then((result) => {
            resolve({
                code: 200,
                message: "上傳成功",
                imageUrl: `/img/${filename}`
            });
        }).catch((error) => {
            reject(error);
        })
    })
}

export default {
    uploadImage
}