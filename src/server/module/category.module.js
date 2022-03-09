import query from '../database/basic.database.js';

const getCategories = (user) => {
    return new Promise((resolve,reject) => {
        query("SELECT TypeID AS id, TypeName as name FROM Type ").then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    });
};

export default {
    getCategories
};