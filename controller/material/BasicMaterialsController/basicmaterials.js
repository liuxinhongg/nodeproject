var db = require("../../../config/db.js"); //导入数据库连接池
var materialsSql = require("../../../config/apisql.js"); //导入sql操作
//基础物资类
class BasicMaterials {
    //插入
    basicMaterialsAdd(req, res, next) {
        var mcode = req.query.mcode;
        var mname = req.query.mname;
        var mtype = req.query.mtype;
        var munit = req.query.munit;
        var filepaths = req.query.filepaths;
        var remark = req.query.remark;
        if (mname == "" || mcode == "") {
            res.json({
                msg: "该物资不存在",
                code: -1
            });
        }
        db.query(materialsSql.basicmaterials.addMaterials, [mcode, mname, mtype, munit, filepaths, remark], function (result, faileds) {
            res.json({
                msg: "插入成功",
                code: 0
            });
        })
    }
    //查询
    findBasicMaterialsById(req, res, next) {
        var id = req.query.id;
        var mcode = req.query.mcode;
		console.log(mcode)
        if (id == "") {
            res.json({
                msg: "该物资不存在",
                code: -1
            });
        }
		if((mcode==null||mocode==undefined)&&(id==null||id==undefined)){
			db.query(materialsSql.basicmaterials.findAllMaterials,[],function(result,faileds){
				res.json({
				    msg: "查询成功",
				    code: 0,
				    data: result
				})
			})
		}else{
			db.query(materialsSql.basicmaterials.findMaterialsById, [id,mcode], function (result, faileds) {
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
    updateBasicMaterials(req, res, next) {
        var id = req.query.id;
        var mcode = req.query.mcode;
        var mname = req.query.mname;
        var mtype = req.query.mtype;
        var munit = req.query.munit;
        var filepaths = req.query.filepaths;
        var remark = req.query.remark;
        id
        db.query(materialsSql.basicmaterials.findMaterialsById, [id,''], function (result, faileds) {
            if (result.length) {
                db.query(materialsSql.basicmaterials.updateMaterials, [mcode || result[0].mcode, mname || result[0].mname, mtype || result[0].mtype, munit || result[0].munit, filepaths || result[0].filepaths, remark || result[0].remark, id], function (result, faileds) {
                    res.json({
                        msg: "修改成功",
                        code: 0
                    });
                })
            }
        })

    }
    //删除
    deleteBasicMaterials(req, res, next) {
        var mname = req.query.mname;
        if (mname == "") {
            res.json({
                msg: "该物资不存在",
                code: -1
            });
        }
        db.query(materialsSql.basicmaterials.deleteMaterialsByName, [mname], function (result, faileds) {
            res.json({
                msg: "删除成功",
                code: 0
            });
        })
    }
}
//导出基础物资
module.exports = new BasicMaterials();