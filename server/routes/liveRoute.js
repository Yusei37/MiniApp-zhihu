var express = require('express');
var router = express.Router();

let live = require('../models/live');

// 随机获取3个Live数据
// return Array of live
router.get('/', function(req, res, next) {
  let step = Math.ceil(Math.random() * 12)
  live.find(function (err, data) {
    if (data) {
      res.json(data);
    } 
    else if (err) {
      res.json('服务器异常');
    }
    else {
      res.json("没有Live数据");
    }
  }).skip(step).limit(3);
});


module.exports = router;