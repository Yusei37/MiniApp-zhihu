var express = require('express');
var router = express.Router();

let user = require('../models/user');

// router.get('/login/:nickName', function (req, res, next) {
//   user.findOne({nickName: req.params.nickName}, (err, data) => {
//     if (err) {
//       res.json('服务器异常');
//     }
//     else if (data) {
//       console.log('登录成功用户：' + data);
//       res.json(data);
//     }
//     else {
//       user.create({nickName: req.params.nickName}, function (err, data) {
//         if (err) throw err;
//         console.log('新用户注册成功: ' + data);
//         res.json(data);
//       })
//     }
//   })
// });

// 小程序端用户授权后，登录或注册
// req.body: Object of user
// return Object of user
router.post('/login', function (req, res, next) {
  // console.log(req.body)
  // res.send(req.body)
  user.findOne(req.body, (err, data) => {
    if (err) {
      res.json('服务器异常');
    }
    else if (data) {
      console.log('登录成功用户：' + data);
      res.json(data);
    }
    else {
      user.create(req.body, function (err, data) {
        if (err) throw err;
        console.log('新用户注册成功: ' + data);
        res.json(data);
      })
    }
  })
})

// 根据用户ID添加关注的人
// req.params: id:String
// req.body: array of follow
// return Object of user
router.put('/:id/modifyFollow', function(req, res, next) {
  let str = req.params.id
  let follow = req.body
  user.findById(str, function(err, data) {
    if (err) {
      res.json('服务器异常')
    }
    else {
      data.follow = follow
      data.save(function (err, updatedata) {
        if (err) throw err;
        console.log('关注修改成功: ' + updatedata);
        res.json(updatedata);
      })
    }
  })
})

module.exports = router;
