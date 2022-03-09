import query from '../../database/basic.database.js';

/*  User list   */
/**
 * @param  {string} page
 */
 const listUser = (page) => {
    return new Promise((resolve,reject) => {
        if(page === undefined || page === "")
            page = 1
        const dataPerPage = 50;
        const minLimit=(Number(page) - 1) * dataPerPage  
        query('SELECT COUNT(*) as _count FROM Member ').then((result)=>{
            const total = Number(result[0]._count);
            const pages = Math.ceil(total / dataPerPage);
            query('SELECT MemberID,Account,Name,Email,isAdmin,isBan FROM Member  LIMIT ?,?', [minLimit,dataPerPage]).then((result) => {
                resolve({ 
                    result,
                    total,
                    pages,
                }); 
            }).catch((error) => {reject(error);});
        }).catch((error) => {reject(error);});
    })    
};

/**
 * @param  {string} userId
 * @param  {object} operate
 * @param  {boolean} operate.isBan
 * @param  {boolean} operate.isAdmin
 */
const modifyUserStatus = (userId, operate) => {
    return new Promise((resolve,reject) => { 
        const expectColumns = ["isAdmin", "isBan"];
        const params = []
        const operateColumns = []
        expectColumns.forEach(column => {
            if(operate[column] !== undefined){
                operateColumns.push(`${column} = ?`);
                params.push(operate[column] ? 1 : 0);
            }
        });
        params.push(userId);
        const sql = `UPDATE Member SET ${operateColumns.join(",")} WHERE MemberID = ?`  
        query(sql, params).then(() => {
            resolve({ 
                code: 200,
                message: "操作成功"
            });
        }).catch((error) => {reject(error);});
    })    
};

const getAllUserStatus = () => {
    return new Promise((resolve,reject) => {
        query("SELECT isBan,COUNT(*) AS 'total' FROM Member GROUP BY isBan").then((result) => {
            resolve({
                unban: result[0].total,
                ban: result[1].total,
            })
        }).catch((error) => {
            reject(error);
        })
    });
}

export default {
    listUser,
    modifyUserStatus,
    getAllUserStatus
};