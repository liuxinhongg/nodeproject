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
        materialPlanDelete: `delete from material_need where prjid = ?`,
        //合同管理
        //新增
        pactInsert: `insert into material_pact (user_id,ct_name,ct_type,pr_id,ct_sum,pay_mode,ct_date,prj_id,pre_pay,deposit,ctext_man,leader_next,m_id,ctd_num,ctd_money,ctd_state) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        // 按条件查找
        pactSearch: `select * from material_pact where prj_id = ? or ct_name = ?`,
        // 查询全部
        pactSearchAll: `select * from material_pact`,
        // 更新合同
        pactUpdate: `update material_pact set user_id = ?,ct_name = ?, ct_type = ?, pr_id = ?, ct_sum = ?, pay_mode = ?, ct_date = ?, pre_pay = ?, deposit = ?, ctext_man = ?,leader_next = ?, m_id = ?,ctd_num = ?,ctd_money = ?,ctd_state = ?  where prj_id = ?`,
        //合同的删除
        pactDelete: `delete from material_pact where prj_id = ?`,
		/*入厂验收*/
		//添加语句
		addsql: `insert into admission(vno,verMan,proId,mConId,aprlistId,ifacpt,mmid,mnum,ifsave,repold,rmanver,filepathsmlist) values(?,?,?,?,?,?,?,?,?,?,?,?)`,
		//判断数据库是否存在该数据语句
		samesql: `select * from admission where mmid=?`,
		//删除指定数据语句
		delsql: `delete from admission where mmid=?`,
		//查找指定mmid数据
		searchsql: `select * from admission where mmid=?`,
		//更新语句
		updatesql: `update admission set vno=?,verMan=?,proId=?,mConId=?,aprlistId=?,ifacpt=?,mnum=?,ifsave=?,repold=?,rmanver=?,filepathsmlist=? where mmid=?`,
		
		/*材料进退库*/
		addsql1: `insert into delivery(prjid,inputid,teamid,iptDate,filepaths,state,mmid,mloc,mnum,repoid) values(?,?,?,?,?,?,?,?,?,?)`,
		samesql1: `select * from delivery where mmid=?`,  //查询数据
		updatesql1: `update delivery set prjid=?,inputid=?,teamid=?,iptDate=?,filepaths=?,state=?,mloc=?,mnum=?,repoid=? where mmid=?`,    //修改数据库数据
		delsql1: `delete from delivery where id=?`,   //删除数据库数据
		
		/*材料明细表语句*/
		//添加语句
		addsql2: 'insert into content(mmidName,mnum) values(?,?)',
		//查询语句
		findsql2: 'select * from content where mmidName=?',
		//删除语句
		delsql2: 'delete from content where mmidName=?',
		//修改语句
		boxsql2: 'update content set mnum=? where mmidName=?',
		//仓库的新增
		material_register: "insert into material_config(storeMan,storeName,storeLoc,remark) values(?,?,?,?)",
		//仓库更新
		material_update: "update material_config  set storeName=?,storeLoc=?,remark=? where storeMan=?",
		//获取仓库的信息
		material_info: "select * from material_config where storeMan=?",
		//获取所有仓库信息
		material_infoAll: "select * from material_config",
		//仓库的删除
		material_delete: "delete from material_config where storeMan=?",
    },
	contract: {
	    // 按ID查询按名字查询
	    selectId: `select * from contract where id=?`,
	    //按名字查询
	    selectName: `select * from contract where reponName=?`,
	    //查询 名字或ID
	    selects: `select * from contract where id=? or reponName=?`,
	    // 查询全部
	    selectAll: `select * from contract`,
	    // 添加
	    insert: `insert into contract(remanName,reponName,repoloc) values(?,?,?)`,
	    // 按ID删除
	    deleteId: `delete  from contract where id=?`,
	    // 按名字删除
	    deleteName: `delete  from contract where reponName=?`,
	    // 按ID修改
	    updateId: `update contract set remanName=?,reponName=?,repoloc=? where id=?`,
	},
	//供应商
	vendor: {
	    //查询供应商
	    findVendorByName: `select * from vendor_config where pname=?`,
		// 查询所有
		findAllVendor:`select * from vendor_config`,
	    //修改供应商
	    updateVendor: `update vendor_config set parea=?,pcotype=?,ptype=?,pprof=?,paddr=?,leader=?,personid=?,telno=?,coid=?,bankname=?,bankcode=? where pname=?`,
	    //添加供应商
	    addVendor: `insert into vendor_config (pname,parea,pcotype,ptype,pprof,paddr,leader,personid,telno,coid,bankname,bankcode) values(?,?,?,?,?,?,?,?,?,?,?,?)`,
	    //按名称删除供应商
	    deleteVendorByName: `delete from vendor_config where pname=?`,
	},
	//基础物资
	basicmaterials: {
	    // //按编号查询基础物资
	    // findMaterialsByCode: `select * from basic_materials where mcode=?`,
	    //按Id查询基础物资
	    findMaterialsById: `select * from basic_materials where id=? or mcode=?`,
	    // //查询全部基础物资
	    findAllMaterials: `select * from basic_materials`,
	    //修改基础物资
	    updateMaterials: `update basic_materials set mcode=?,mname=?,mtype=?,munit=?,filepaths=?,remark=? where id=?`,
	    //添加基础物资
	    addMaterials: `insert into basic_materials (mcode,mname,mtype,munit,filepaths,remark) values(?,?,?,?,?,?)`,
	    //按名称删除基础物资
	    deleteMaterialsByName: `delete from basic_materials where mname=?`,
	    // //按编号删除基础物资
	    // deleteMaterialsByCode: `delete from basic_materials where mcode=?`,
	}
}
module.exports = sqlMap