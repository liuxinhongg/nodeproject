var db = require("../../../config/db");
var dtime = require('time-formater');
var materialConfig = require("../../../config/apisql");

class Material {
    material_search(req, res, next) {
        let m = {
            'prjid': req.query.prjid,
            'planname': req.query.planname,
        }
        if (m.prjid != null || m.planname != null) {
            db.query(materialConfig.material.materialSearch, [m.prjid, m.planname], (result, fields) => {
                res.json({ code: 1, msg: '查询成功', date: result });
            })
        } else {
            db.query(materialConfig.material.materialSearcAll, [], (result, fields) => {
                res.json({ code: 1, msg: '查询成功', data: result });
            })
        }
    };
    // 添加数据
    material_insert(req, res, next) {
        console.log(req.query);
        let m = {
                'prjid': req.query.prjid,
                'planname': req.query.planname,
                'cmtId': req.query.cmtId,
                'leaderNext': req.query.leaderNext,
                'cdate': req.query.cdate,
                'mname': req.query.mname,
                'userLoc': req.query.userLoc,
                'mnum': req.query.mnum
            }
            /*
                添加数据
            /** select 主逻辑 **/
        db.query(materialConfig.material.materialSearch, [m.prjid, m.planname], (result, fields) => {
            if (result.length) {
                res.json({ code: -1, msg: 'id存在' })
            } else {
                let add = [m.prjid, m.planname, m.cmtId, m.leaderNext, m.cdate, m.mname, m.userLoc, m.mnum]
                db.query(materialConfig.material.materialInsert, add, (result, fields) => {
                    if (fields) {
                        console.log(fields)
                        return // end
                    }
                    res.json({ code: 1, msg: '添加成功' })
                })
            }
        })

    };
    // 材料的更新
    material_update(req, res, next) {
        let m = {
                'prjid': req.query.prjid,
                'planname': req.query.planname,
                'cmtId': req.query.cmtId,
                'leaderNext': req.query.leaderNext,
                'cdate': req.query.cdate,
                'mname': req.query.mname,
                'userLoc': req.query.userLoc,
                'mnum': req.query.mnum
            }
            /* 更新数据 */
        db.query(materialConfig.material.materialSearch, [m.prjid, m.planname], (result, fields) => {
            if (result.length) {
                console.log(result)
                let add = [m.planname, m.cmtId, m.leaderNext, m.cdate, m.mname, m.userLoc, m.mnum, m.prjid]
                db.query(materialConfig.material.materialUpdate, add, (result, fields) => {
                    if (fields) {
                        console.log(fields)
                        return // end
                    }
                    res.json({ code: 1, msg: '更新成功' })
                })
            } else {
                res.json({ code: -1, msg: '更新失败' })
            }
        })
    };
    /*删除数据 */
    material_delete(req, res, next) {
        let prjid = req.params.prjid
        db.query(materialConfig.material.materialSearch, [prjid, ''], (result, fields) => {
            if (result.length) {
                db.query(materialConfig.material.materialDelete, [prjid, ''], (result, fields) => {
                    if (result) {
                        res.json({ code: 1, msg: '删除成功' })
                    }
                })
            } else {
                res.json({ code: -1, msg: '删除失败' })
            }
        })
    }
}
module.exports = new Material();