var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken"); //生成token
var secretkey = 'secretkey';
// var db = require("../config/db")
// var userconfig = require("../config/apisql")
var Admin = require('../controller/admin/admin')
router.use(function(req, res, next) {
        console.log(req.url)
        if (req.url != '/login' && req.url != '/register') {
            //token可能存在post请求和get请求
            let token = req.body.token || req.query.token || req.headers.token;
            console.log(token)
            jwt.verify(token, secretkey, function(err, decode) {
                if (err) {
                    res.json({
                        message: 'token过期，请重新登录',
                        resultCode: '403'
                    })
                } else {
                    next();
                }
            })
        } else {
            next();
        }
    })
    // 用户注册
router.post('/register', Admin.admin_register);
// 登录接口
router.post('/login', Admin.admin_login);
// 获取用户信息
router.get("/userinfo", Admin.user_info)
module.exports = router;