const sqlMap = {
    user: {
        //用户信息的查找
        userSearch: `select * from user_insert where username=?`,
        // 用户信息的插入
        userInsert: `INSERT INTO user_insert (username,password,email,phone) VALUES(?,?,?,?)`,
    },
    material: {
        // 材料总计划的新增
        materialInsert: `insert into material_plan (prjid,planname,cmtId,leaderNext,cdate,mname,userLoc,mnum) values(?,?,?,?,?,?,?,?)`,
        // 材料总计划的查找
        materialSearch: `select * from material_plan where prjid = ?`,
        // 材料总计划的删除
        materialDelete: `delete from material_plan where prjid = ?`,
        // 材料总计划的更新
        materialUpdate: `update material_plan set planname = ?,cmtId = ?, leaderNext = ?, cdate = ?, mname = ?, userLoc = ?, mnum = ? where prjid = ?`
    }
}
module.exports = sqlMap