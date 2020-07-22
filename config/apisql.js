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
        materialSearch: `select * from material_plan where prjid = ? or planname = ?`,
        materialSearcAll: `select * from material_plan`,
        // 材料总计划的删除
        materialDelete: `delete from material_plan where prjid = ?`,
        // 材料总计划的更新
        materialUpdate: `update material_plan set planname = ?,cmtId = ?, leaderNext = ?, cdate = ?, mname = ?, userLoc = ?, mnum = ? where prjid = ?`,
        //材料需用计划 
        //新增
        materialNeedInsert: `insert into material_need (prjid,mr_name,cmt_man,exec_man,cmt_date,come_date,userloc,mnum,mprice,ifover,prov_state,remark) values(?,?,?,?,?,?,?,?,?,?,?,?)`,
        //按条件查找
        materialNeedSearch: `select * from material_need where prjid = ? or cmt_man = ?`,
        // 查询全部
        materialNeedSearchAll: `select * from material_need`,
        //需求计划的更新
        materialPlanUpdate: `update material_need set mr_name = ?,cmt_man = ?, exec_man = ?, cmt_date = ?, come_date = ?, userloc = ?, mnum = ?, mprice = ?, ifover = ?, prov_state = ?, remark = ? where prjid = ?`,
        //需求计划的删除
        materialPlanDelete: `delete from material_need where prjid = ?`
    }
}
module.exports = sqlMap