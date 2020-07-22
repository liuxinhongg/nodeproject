var db = require("../../../config/db");
var dtime = require('time-formater');
var materialConfig = require("../../../config/apisql");

class Material {
    // 查询
    need_search(req, res, next) {
        let m = {
            'prjid': req.query.prjid,
            'cmt_man': req.query.cmt_man
        }
        console.log("执行人：" + m.cmt_man);
        if (m.prjid != null || m.cmt_man != null) {
            db.query(materialConfig.material.materialNeedSearch, [m.prjid, m.cmt_man], (result, fields) => {
                // console.log(result);
                res.json({ code: 1, msg: '查询成功', date: result })
            })
        } else {
            db.query(materialConfig.material.materialNeedSearchAll, [], (result, fields) => {
                res.json({ code: 1, msg: '查询成功', data: result });
            })
        }
    };
    // 添加数据
    need_insert(req, res, next) {
        console.log(req.query)
        let m = {
                'prjid': req.query.prjid,
                'mr_name': req.query.mr_name,
                'cmt_man': req.query.cmt_man,
                'exec_man': req.query.exec_man,
                'cmt_date': req.query.cmt_date,
                'come_date': req.query.come_date,
                'userloc': req.query.userloc,
                'mnum': req.query.mnum,
                'mprice': req.query.mprice,
                'ifover': req.query.ifover,
                'prov_state': req.query.prov_state,
                'remark': req.query.remark
            }
            /*
                添加数据
            /** select 主逻辑 **/
        db.query(materialConfig.material.materialNeedSearch, [m.prjid, m.cmt_man], (result, fields) => {
            console.log(result);
            if (result.length) {
                res.json({ code: -1, msg: 'id存在' });
            } else {
                let add = [m.prjid, m.mr_name, m.cmt_man, m.exec_man, m.cmt_date, m.come_date, m.mprice, m.userloc, m.mnum, m.ifover, m.prov_state, m.remark]
                db.query(materialConfig.material.materialNeedInsert, add, (result, fields) => {
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
    need_update(req, res, next) {
        let m = {
                'prjid': req.query.prjid,
                'mr_name': req.query.mr_name,
                'cmt_man': req.query.cmt_man,
                'exec_man': req.query.exec_man,
                'cmt_date': req.query.cmt_date,
                'come_date': req.query.come_date,
                'userloc': req.query.userloc,
                'mnum': req.query.mnum,
                'mprice': req.query.mprice,
                'ifover': req.query.ifover,
                'prov_state': req.query.prov_state,
                'remark': req.query.remark
            }
            /* 更新数据 */
        db.query(materialConfig.material.materialNeedSearch, [m.prjid, m.cmt_man], (result, fields) => {
            if (result.length) {
                console.log(result)
                let add = [m.mr_name, m.cmt_man, m.exec_man, m.cmt_date, m.come_date, m.mprice, m.userloc, m.mnum, m.ifover, m.prov_state, m.remark, m.prjid]
                db.query(materialConfig.material.materialPlanUpdate, add, (result, fields) => {
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
    need_delete(req, res, next) {
        let prjid = req.params.prjid
        db.query(materialConfig.material.materialNeedSearch, [prjid, ''], (result, fields) => {
            if (result.length) {
                db.query(materialConfig.material.materialPlanDelete, prjid, (result, fields) => {
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