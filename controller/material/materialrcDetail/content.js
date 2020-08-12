var fzSQL = require('../../../config/db.js');
var apisql = require('../../../config/apisql.js');

class Content{
    add(req,res,next){
        const mmidName = req.query.mmidName;
        const mnum = req.query.mnum;
        if(mmidName == '' || mnum == ''){
            res.json({msg:'填写字段不能为空',code: 1});
            return;
        }

        fzSQL.query(apisql.material.findsql2,[mmidName],function(result){
            if(result.length){
                res.json({msg:'材料名已存在',code: -1});   
            }else{
                fzSQL.query(apisql.material.addsql2,[mmidName,mnum],function(result){
                    res.json({msg:'添加成功',code: 0});  
                })
            }
           
        })
    }
    del(req,res,next){
        const mmidName = req.query.mmidName;
        if(mmidName == ''){
            res.json({msg:'填写字段不能为空',code: 1});
            return;
        }

        fzSQL.query(apisql.material.findsql2,[mmidName],function(result){
            if(!result.length){
                res.json({msg:'材料名不存在',code: -1});   
            }else{
                fzSQL.query(apisql.material.delsql2,[mmidName],function(result){
                    res.json({msg:'删除成功',code: 0});  
                })
            }
           
        })
    }
    find(req,res,next){
        const mmidName = req.query.mmidName;
        if(mmidName == null){
            fzSQL.query('select * from content',[],function(result){
                res.json({msg: "材料查询成功",code: 0,data:result});
            })
            return;
        }else if(mmidName == ''){
            res.json({msg:'填写字段不能为空',code: 1});
            return;
        }

        fzSQL.query(apisql.material.findsql2,[mmidName],function(result){
            if(!result.length){
                res.json({msg:'材料名不存在',code: -1});   
            }else{
                res.json({msg:'查询成功',code: 0,data:result});  
            }
           
        })
    }
    update(req,res,next){
        const mmidName = req.query.mmidName;
        const mnum = req.query.mnum;
        if(mmidName == '' || mnum == ''){
            res.json({msg:'填写字段不能为空',code: 1});
            return;
        }

        fzSQL.query(apisql.material.findsql2,[mmidName],function(result){
            if(!result.length){
                res.json({msg:'材料名不存在',code: -1});   
            }else{
                fzSQL.query(apisql.material.boxsql2,[mnum,mmidName],function(result){
                    res.json({msg:'更改成功',code: 0});  
                })
            }
           
        })
    }
}

exports.Content = new Content();