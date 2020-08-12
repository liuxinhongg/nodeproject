var fzSQL = require('../../../config/db.js');
var apisql = require('../../../config/apisql.js');

class Admission{
    add(req,res,next){
        const vno = req.query.vno;
        const verMan = req.query.verMan;
        const proId = req.query.proId;
        const mConId = req.query.mConId;
        const aprlistId = req.query.aprlistId;
        const ifacpt = req.query.ifacpt;
        const mmid = req.query.mmid;
        const mnum = req.query.mnum;
        const ifsave = req.query.ifsave;
        const repold = req.query.repold;
        const rmanver = req.query.rmanver;
        const filepathsmlist = req.query.filepathsmlist;
        if(vno == "" || verMan == "" || proId == "" || mConId == "" || aprlistId == "" || ifacpt == "" || mmid == "" || mnum == "" || ifsave == "" || repold == "" || rmanver == "" || filepathsmlist == ""){
            res.json({msg: "必须填写全部字段！",code: 1});
            return;
        }
        fzSQL.query(apisql.material.samesql,[mmid],function(result1){
            if(result1.length){
                res.json({msg: "材料名已存在！",code: -1});
                return;
            }else{
                fzSQL.query(apisql.material.addsql,[vno,verMan,proId,mConId,aprlistId,ifacpt,mmid,mnum,ifsave,repold,rmanver,filepathsmlist],function(result2){
                    res.json({msg: "材料入库成功！",code: 0});
                })
            }
        });
    }
    del(req,res,next){
        const mmid = req.query.mmid;
        if(mmid == ""){
            res.json({msg: "必须填写材料名！",code: 1});
            return;
        }
        fzSQL.query(apisql.material.samesql,[mmid],function(result1){
            if(!result1.length){
                res.json({msg: "材料不存在！",code: -1});
                return;
            }else{
                fzSQL.query(apisql.material.delsql,[mmid],function(result2){
                    res.json({msg: "材料删除成功！",code: 0});
                })
            }
        });
    }
    search(req,res,next){
        const mmid = req.query.mmid;
        if(mmid == null){
            fzSQL.query('select * from admission',[],function(result){
                res.json({msg: "材料查询成功",code: 0,data:result});
            })
            return;
        }else if(mmid == ""){
            res.json({msg: "必须填写材料名！",code: 0});
            return;
        }
        fzSQL.query(apisql.material.samesql,[mmid],function(result1){
            if(!result1.length){
                res.json({msg: "材料不存在！",code: -1});
                return;
            }else{
                fzSQL.query(apisql.material.searchsql,[mmid],function(result2){
                    res.json({msg: "材料查找成功！",code: 0,data: result2});
                })
            }
        });
    }
    update(req,res,next){
        const vno = req.query.vno;
        const verMan = req.query.verMan;
        const proId = req.query.proId;
        const mConId = req.query.mConId;
        const aprlistId = req.query.aprlistId;
        const ifacpt = req.query.ifacpt;
        const mmid = req.query.mmid;
        const mnum = req.query.mnum;
        const ifsave = req.query.ifsave;
        const repold = req.query.repold;
        const rmanver = req.query.rmanver;
        const filepathsmlist = req.query.filepathsmlist;
        if(mmid == ""){
            res.json({msg: "必须填写材料名！",code: 1});
            return;
        }
        fzSQL.query(apisql.material.samesql,[mmid],function(result1){
            if(!result1.length){
                res.json({msg: "材料不存在！",code: -1});
                return;
            }else{
                fzSQL.query(apisql.material.updatesql,[vno || result1[0].vno,verMan || result1[0].verMan,proId || result1[0].proId,mConId || result1[0].mConId,aprlistId || result1[0].aprlistId,ifacpt || result1[0].ifacpt,mnum || result1[0].mnum,ifsave || result1[0].ifsave,repold || result1[0].repold,rmanver || result1[0].rmanver,filepathsmlist || result1[0].filepathsmlist,mmid],function(result2){
                    res.json({msg: "材料更新成功！",code: 0});
                })
            }
        });
    }

}

exports.Admission = new Admission();