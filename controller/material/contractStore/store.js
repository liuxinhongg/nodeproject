var db = require("../../../config/db");
var sql = require("../../../config/apisql");
//仓库
class Material {
    material_register(req, res, next) {
        var storeMan = req.query.storeMan
        var storeName = req.query.storeName;
        var storeLoc = req.query.storeLoc;
        var remark = req.query.remark;
        if ((storeMan == '' || storeMan == undefined) || (storeName == '' || storeName == undefined)) {
            res.send({ "msg": "仓库管理员或仓库名称不能为空，或仓库管理员或仓库名称不正确，请重新输入", "code": -1 });
            return;
        }
        db.query(sql.material.material_info, [storeMan], function (result, faileds) {
            console.log(result)
            if (result.length) {
                res.send({ "msg": "仓库管理员已存在", "code": 1 });
                return;
            }
            else {
                db.query(sql.material.material_register, [storeMan, storeName, storeLoc, remark], function (result, faileds) {
                    if (faileds) {
                        throw faileds;
                        return;
                    }
                    res.send({ "msg": "添加成功", "code": 0 });
                    return;
                })
            }
        })
    }
    material_info(req, res, next) {
        var storeMan = req.query.storeMan;
        if (storeMan == '' || storeMan == undefined) {
            res.send({ "msg": "仓库管理员不能为空", "code": -1 });
            return;
        }
        db.query(sql.material.material_info, [storeMan], function (result, faileds) {
            if (result.length) {
                res.send({ "msg": "获取成功", "code": 0, "data": result[0] });
                return;
            }
            else {
                res.send({ "msg": "请输入正确的仓库管理员", "code": -1 });
                return;
            }
        })
    }
    material_delete(req, res, next) {
        var storeMan = req.query.storeMan;
        db.query(sql.material.material_info, [storeMan], function (result, faileds) {
            if (result.length) {
                db.query(sql.material.material_delete, [storeMan], function (result, faileds) {
                    if (faileds) {
                        throw faileds;
                        return;
                    }
                    res.send({ "msg": "删除完成", "code": 0 });
                    return;
                })
            }
            else {
                res.send({ "msg": "请输入正确的仓库管理员", "code": -1 });
                return;
            }
        })
    }
    material_update(req, res, next) {
        var storeMan = req.query.storeMan
        var storeName = req.query.storeName;
        var storeLoc = req.query.storeLoc;
        var remark = req.query.remark;
        db.query(sql.material.material_info, [storeMan], function (result, faileds) {
            if (result.length) {
                db.query(sql.material.material_update, [storeName, storeLoc, remark, storeMan], function (result, faileds) {
                    if (faileds) {
                        throw faileds;
                        return;
                    }
                    res.send({ "msg": "仓库更新完成", "code": 0 })
                    return;
                })
            }
            else {
                res.send({ "msg": "请输入正确的仓库管理员", "code": -1 })
                return;
            }
        })
    }
}


module.exports = new Material();
