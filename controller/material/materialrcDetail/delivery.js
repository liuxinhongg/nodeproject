var fzSQL = require('../../../config/db.js');
var apisql = require('../../../config/apisql.js');

class Delivery {
    // 增加
    add(req, res, next) {
        const prjid = req.query.prjid;
        const inputid = req.query.inputid;
        const teamid = req.query.teamid;
        const iptDate = req.query.iptDate;
        const filepaths = req.query.filepaths;
        const state = req.query.state;
        const mmid = req.query.mmid;
        const mloc = req.query.mloc;
        const mnum = req.query.mnum;
        const repoid = req.query.repoid;
        if (prjid === '' || inputid === '' || teamid === '' || iptDate === '' || filepaths === '' || state === '' || mmid === '' || mloc === '' || mnum === '' || repoid === '') {
            res.json({ 'msg': "输入字段不能为空！", state: 1 })
            return;
        }
        fzSQL.query(apisql.material.samesql1, [mmid], function (result) {
            if (result.length) {
                res.json({ 'msg': "材料名已存在！", state: -1 })
                return;
            } else {
                fzSQL.query(apisql.material.addsql1, [prjid, inputid, teamid, iptDate, filepaths, state, mmid, mloc, mnum, repoid], function (result, err) {
                    if (err) {
                        return err;
                    }
                    res.json({
                        msg: "添加成功",
                        state: 0
                    });
                })
            }
        })
    }
    // 删除
    del(req, res, next) {
        const mmid = req.query.mmid;
        if (mmid === '') {
            res.json({ 'msg': "输入字段不能为空！", state: 1 })
            return;
        }
        fzSQL.query(apisql.material.samesql1, [mmid], function (result) {
            if (!result.length) {
                res.json({ 'msg': "材料名不存在！", state: -1 })
                return;
            } else {
                fzSQL.query(apisql.material.delsql1, [mmid], function (result, err) {
                    if (err) {
                        return err;
                    }
                    res.json({
                        msg: "删除成功",
                        state: 0
                    });
                })
            }
        })
    }
    // 查询
    find(req, res, next) {
        const mmid = req.query.mmid;
        if(mmid == null){
            fzSQL.query('select * from delivery',[],function(result){
                res.json({msg: "材料查询成功",code: 0,data:result});
            })
            return;
        }else if (mmid === '') {
            res.json({ 'msg': "输入字段不能为空！", state: 1 })
            return;
        }
        fzSQL.query(apisql.material.samesql1, [mmid], function (result) {
            if (!result.length) {
                res.json({ 'msg': "材料名不存在！", state: -1 })
                return;
            } else {
                res.json({
                    msg: "查询成功",
                    state: 0,
                    data: result
                });

            }
        })
    }
    // 修改
    update(req, res, next) {
        const prjid = req.query.prjid;
        const inputid = req.query.inputid;
        const teamid = req.query.teamid;
        const iptDate = req.query.iptDate;
        const filepaths = req.query.filepaths;
        const state = req.query.state;
        const mmid = req.query.mmid;
        const mloc = req.query.mloc;
        const mnum = req.query.mnum;
        const repoid = req.query.repoid;
        if (mmid === "") {
            res.json({ 'msg': "输入字段不能为空！", state: 1 })
            return;
        }
        fzSQL.query(apisql.material.samesql1, [mmid], function (result) {
            if (!result.length) {
                res.json({ 'msg': "材料名不存在！", state: -1 })
                return;
            } else {
                fzSQL.query(apisql.material.updatesql1, [prjid || result[0].prjid, inputid || result[0].inputid, teamid || result[0].teamid, iptDate || result[0].iptDate, filepaths || result[0].filepaths, state || result[0].state, mloc || result[0].mloc, mnum || result[0].mnum, repoid || result[0].repoid, mmid], function (result, err) {
                    if (err) {
                        return err;
                    }
                    res.json({
                        msg: "修改成功",
                        state: 0
                    });
                })
            }
        })
    }
}
exports.Delivery = new Delivery();