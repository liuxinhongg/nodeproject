var db = require("../../../config/db");
var materialConfig = require("../../../config/apisql");

class Material {
    // 查询
    pact_search(req, res, next) {
        let m = {
            'prj_id': req.query.prj_id,
            'ct_name': req.query.ct_name
        }
        console.log("执行人：" + m.ct_name);
        if (m.prj_id != null || m.ct_name != null) {
            db.query(materialConfig.material.pactSearch, [m.prj_id, m.ct_name], (result, fields) => {
                // console.log(result);
                res.json({ code: 1, msg: '查询成功', date: result })
            })
        } else {
            db.query(materialConfig.material.pactSearchAll, [], (result, fields) => {
                res.json({ code: 1, msg: '查询成功', data: result });
            })
        }
    };
    // 添加数据
    pact_insert(req, res, next) {
        console.log(req.query);
        let m = {
                'user_id': req.query.user_id,
                'ct_name': req.query.ct_name,
                'ct_type': req.query.ct_type,
                'pr_id': req.query.pr_id,
                'ct_sum': req.query.ct_sum,
                'pay_mode': req.query.pay_mode,
                'ct_date': req.query.ct_date,
                'prj_id': req.query.prj_id,
                'pre_pay': req.query.pre_pay,
                'deposit': req.query.deposit,
                'ctext_man': req.query.ctext_man,
                'leader_next': req.query.leader_next,
                'm_id': req.query.m_id,
                'ctd_num': req.query.ctd_num,
                'ctd_money': req.query.ctd_money,
                'ctd_state': req.query.ctd_state
            }
            /*
                添加数据
            /** select 主逻辑 **/
        db.query(materialConfig.material.pactSearch, [m.prj_id, m.ct_name], (result, fields) => {
            console.log(result);
            if (result.length) {
                res.json({ code: -1, msg: 'id存在' });
            } else {
                let add = [m.user_id, m.ct_name, m.ct_type, m.pr_id, m.ct_sum, m.pay_mode, m.ct_date, m.prj_id, m.pre_pay, m.deposit, m.ctext_man, m.leader_next, m.m_id, m.ctd_num, m.ctd_money, m.ctd_state]
                db.query(materialConfig.material.pactInsert, add, (result, fields) => {
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
    pact_update(req, res, next) {
        let m = {
                'user_id': req.query.user_id,
                'ct_name': req.query.ct_name,
                'ct_type': req.query.ct_type,
                'pr_id': req.query.pr_id,
                'ct_sum': req.query.ct_sum,
                'pay_mode': req.query.pay_mode,
                'ct_date': req.query.ct_date,
                'prj_id': req.query.prj_id,
                'pre_pay': req.query.pre_pay,
                'deposit': req.query.deposit,
                'ctext_man': req.query.ctext_man,
                'leader_next': req.query.leader_next,
                'm_id': req.query.m_id,
                'ctd_num': req.query.ctd_num,
                'ctd_money': req.query.ctd_money,
                'ctd_state': req.query.ctd_state
            }
            /* 更新数据 */
        db.query(materialConfig.material.pactSearch, [m.prj_id, m.ct_name], (result, fields) => {
            if (result.length) {
                console.log(result)
                let add = [m.user_id, m.ct_name, m.ct_type, m.pr_id, m.ct_sum, m.pay_mode, m.ct_date, m.pre_pay, m.deposit, m.ctext_man, m.leader_next, m.m_id, m.ctd_num, m.ctd_money, m.ctd_state, m.prj_id]
                db.query(materialConfig.material.pactUpdate, add, (result, fields) => {
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
    pact_delete(req, res, next) {
        let prj_id = req.params.prj_id
        db.query(materialConfig.material.pactSearch, [prj_id, ''], (result, fields) => {
            if (result.length) {
                db.query(materialConfig.material.pactDelete, prj_id, (result, fields) => {
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