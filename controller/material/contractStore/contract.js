var db = require("../../../config/db");
var sql = require("../../../config/apisql");
//合同
class Oper {
    // 添加
    operAdd(req, res, next) {
        var remanName = req.query.remanName;
        var reponName = req.query.reponName;
        var repoloc = req.query.repoloc;
        if ((remanName != '' || remanName != undefined) && (reponName != '' || reponName != undefined) && (repoloc != '' || repoloc != undefined)) {
            db.query(sql.contract.selectName, [reponName], function (result, faildes) {
                console.log(1);
                if (result.length) {
                    res.json({ "msg": "用户已存在", "code": 1 });
                } else {
                    console.log(2);
                    db.query(sql.contract.insert, [remanName, reponName, repoloc], function (result, faileds) {
                        console.log(3);
                        if (result.length != 0) {
                            res.json({ "msg": "注册成功~", "code": 0 })
                        } else {
                            throw faileds;
                            return;
                        }
                    })
                }
            })
        } else {
            res.json({ "msg": "输入格式错误", "code": -1 });
            return;
        }
    }
    // 查询
    operFind(req, res, next) {
        console.log(req.query);
        var id = req.query.id;
        var reponName = req.query.reponName;
        if (reponName || id) {
            db.query(sql.contract.selects, [id, reponName], function (result, faildes) {
                if (result.length) {
                    res.json({ "msg": "查询成功", "code": 0, data: result });
                }
            })
        } else {
            db.query(sql.contract.selectAll, [], function (result, faildes) {
                if (result.length != 0) {
                    res.json({ "msg": "查询成功", "code": 0, data: result });
                }
            })
        }
    }


    // 删除
    operDel(req, res, next) {
        console.log(req.query);
        var id = req.query.id;
        var reponName = req.query.reponName;
        if (reponName != '' || id != '') {
            db.query(sql.contract.deleteId, [id], function (result, faildes) {
                console.log(result.length == 0)
                if (result.length != 0) {
                    res.json({ "msg": "删除成功！", "code": 0 });
                }
            })
            db.query(sql.contract.deleteName, [reponName], function (result, faildes) {
                if (result.length != 0) {
                    res.json({ "msg": "删除成功！", "code": 0 });
                }
            })
        } else {
            res.json({ "msg": "不存在", "code": -1 });
            return;
        }
    }
    // 修改
    operUpdate(req, res, next) {
        var id = req.query.id;
        var reponName = req.query.reponName;
        var remanName = req.query.remanName;
        var repoloc = req.query.repoloc;

        db.query(sql.contract.selectId, [id], function (result, faildes) {
            if (result.length) {
                db.query(sql.contract.updateId, [remanName || result[0].remanName, reponName || result[0].reponName, repoloc || result[0].repoloc, id], function (results, faildes) {
                    if (results.length != 0) {
                        res.json({ "msg": "修改成功！", "code": 0, data: results });
                    }
                })
            } else {
                res.json({ "msg": "id不存在", "code": -1 });
            }
        })
    }
}
module.exports = new Oper();
