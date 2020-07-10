var db = require("../../config/db");
var md5 = require('md5-node');
var dtime = require('time-formater');
var userconfig = require("../../config/apisql");
var jwt = require("jsonwebtoken"); //生成token
var secretkey = 'secretkey';

class Admin {
    /**
     * 后台注册
     */
    admin_register(req, res, next) {
        console.log(req.body)
        var user = req.body.username;
        var passwords = req.body.password;
        var useremail = req.body.email;
        var userphone = req.body.phone;
        //查询数据库
        db.query(userconfig.user.userSearch, [user], function(result, fields) {
            console.log(result)
            if (result.length) {
                res.send({ "msg": "用户名已存在", "state": 1 })
            } else {
                // 新增数据
                // var addSql = us;
                var addSqlParams = [user, passwords, useremail, userphone];
                db.query(userconfig.user.userInsert, addSqlParams, function(result, fields) {
                    // res.send()
                    if (fields) {
                        throw fields;
                        return;
                    }
                    res.send({ "msg": "注册成功", "state": 0 })
                })
            }
        })
    };

    /*
     *后台登录
     */
    admin_login(req, res, next) {
        console.log(req.body)
        var user = req.body.username;
        var passwords = req.body.password;
        //查询数据库
        db.query(userconfig.user.userSearch, [user], function(result, fields) {
            var token = jwt.sign({ username: user }, secretkey, { expiresIn: 60 * 8 });
            console.log(result.length)
            if (result.length == 0) {
                res.send({ "msg": "用户名不存在", "state": 1 })
            } else {
                let responese = result[0];
                if (responese.username == user && responese.password == passwords) {
                    res.send({
                            "state": 0,
                            "msg": "登录成功",
                            "token": token
                        })
                        // localStorage.setItem("token", token)
                } else {
                    res.send({
                        "state": 2,
                        "msg": '用户名或密码错误'
                    })
                }
            }
        })
    };
    // 用户的信息的录取
    user_info(req, res, next) {
        console.log(req.query)
        var user = req.query.username;
        db.query(userconfig.user.userSearch, [user], function(result, fields) {
            // var tokk = localStorage.getItem('token')
            // if (tokk) {
            if (result.length == 0) {
                res.send({
                    "msg": '该用户不存在,请输入正确的用户名',
                })
            } else {
                let responese = result[0];
                console.log(responese)
                if (responese.username == user) {
                    res.send({
                        "msg": '获取用户信息成功',
                        'state': 0,
                        'userinfo': responese
                    })
                }
            }
            // }
        })
    }
}
module.exports = new Admin();