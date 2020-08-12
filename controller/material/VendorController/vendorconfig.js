var db = require("../../../config/db.js"); //导入数据库连接池
var vendorSql = require("../../../config/apisql.js"); //导入sql操作
//供应商类
class Vendor {
    //插入
    vendorAdd(req, res, next) {
        var pname = req.query.pname;
        var parea = req.query.parea;
        var pcotype = req.query.pcotype;
        var ptype = req.query.ptype;
        var pprof = req.query.pprof;
        var paddr = req.query.paddr;
        var leader = req.query.leader;
        var personid = req.query.personid;
        var telno = req.query.telno;
        var coid = req.query.coid;
        var bankname = req.query.bankname;
        var bankcode = req.query.bankcode;
        if (pname == "") {
            res.json({
                msg: "该供应商不存在",
                code:-1
            });
        }
        db.query(vendorSql.vendor.addVendor, [pname, parea, pcotype, ptype, pprof, paddr, leader, personid, telno, coid, bankname, bankcode], function (result, faileds) {
            res.json({
                msg: "插入成功",
                code: 0
            });
        })
    }
    //查询
    findVendorByName(req, res, next) {
        var pname = req.query.pname;
        if (pname == "") {
            res.json({
                msg: "该供应商不存在",
                code: -1
            });
        }
		if(pname==null){
			db.query(vendorSql.vendor.findAllVendor,[],function(result,faileds){
				res.json({
				    msg: "查询成功",
				    code: 0,
				    data: result
				})
			})
		}else{
			db.query(vendorSql.vendor.findVendorByName, [pname], function (result, faileds) {
				if (result.length) {
					res.json({
						msg: "查询成功",
						code: 0,
						data: result
					})
				}
			})
		}
    }
    //修改
    updateVendor(req, res, next) {
        var pname = req.query.pname;
        var parea = req.query.parea;
        var pcotype = req.query.pcotype;
        var ptype = req.query.ptype;
        var pprof = req.query.pprof;
        var paddr = req.query.paddr;
        var leader = req.query.leader;
        var personid = req.query.personid;
        var telno = req.query.telno;
        var coid = req.query.coid;
        var bankname = req.query.bankname;
        var bankcode = req.query.bankcode;
        db.query(vendorSql.vendor.findVendorByName, [pname], function (result, faileds) {
            if (result.length) {
                db.query(vendorSql.vendor.updateVendor, [parea || result[0].parea, pcotype || result[0].pcotype, ptype || result[0].ptype, pprof || result[0].pprof, paddr || result[0].paddr, leader || result[0].leader, personid || result[0].personid, telno || result[0].telno, coid || result[0].coid, bankname || result[0].bankname, bankcode || result[0].bankcode,pname], function (result, faileds) {
                    res.json({
                        msg: "修改成功",
                        code:0
                    });
                })
            }
        })

    }
    //删除
    deleteVendor(req, res, next) {
        var pname = req.query.pname;
        if (pname == "") {
            res.json({
                msg: "该供应商不存在",
                code:-1
            });
        }
        db.query(vendorSql.vendor.deleteVendorByName, [pname], function (result, faileds) {
            res.json({
                msg: "删除成功",
                code: 1
            });
        })
    }
}
//导出供应商
module.exports = new Vendor();