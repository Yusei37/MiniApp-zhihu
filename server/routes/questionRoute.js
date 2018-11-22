var express = require('express');
var router = express.Router();

let quesiton = require('../models/question');

// 随机获取4个问题的回答数据
// return [{title : String, reply : [{}]}]
router.get('/', function (req, res, next) {
  let step = Math.round(Math.random() * 2)
  quesiton.find({ $where: "this.reply.length > 0" }, function (err, data) {
    if (data) {
      // res.json(data);
      let result = []
      let rand = 0
      for (let i = 0; i < data.length; i++) {
        rand = Math.floor(Math.random() * data[i].reply.length - 0.001)
        if (rand < 0) {
          rand = 0
        }
        let item = {}
        item.title = data[i].title
        item.reply = data[i].reply[rand]
        result.push(item)
      }
      res.json(result)
    }
    else {
      res.json("没有question数据");
    }
  }).skip(step).limit(4);
});

// 根据问题ID获取该问题所有信息
// req.params: id : String
// return Object of question 
router.get('/:id', function (req, res, next) {
  let str = req.params.id
  quesiton.find({ "_id": str }, function (err, data) {
    if (err) {
      throw (err)
    }
    else {
      res.json(data[0])
    }
  })
});

// 添加一个问题
// req.body: Object of question
router.post('/add', function (req, res, next) {
  quesiton.findOne(req.body, (err, data) => {
    if (err) {
      res.json('服务器异常');
    }
    else {
      quesiton.create(req.body, function (err, data) {
        if (err) throw err;
        console.log('问题创建成功: ' + data);
        res.json(data);
      })
    }
  })
})

// 根据问题ID，添加该问题问题的回复
// req.params ： Object of reply
router.put('/:id/addReply', function (req, res, next) {
  let str = req.params.id
  let replyItem = req.body
  quesiton.findById(str, (err, data) => {
    if (err) {
      res.json('服务器异常');
    }
    else {
      data.reply.push(replyItem)
      data.save(function (err, updatedata) {
        if (err) throw err;
        console.log('回答创建成功: ' + updatedata);
        res.json(updatedata);
      })
    }
  })
})

// 根据问题ID，修改收藏列表
// req.params: name:String
// req.body: array of collect
// return Object of question
router.put('/:id/modifyFollow', function (req, res, next) {
  let str = req.params.id
  let follow = req.body
  quesiton.findById(str, (err, data) => {
    if (err) {
      res.json('服务器异常');
    }
    else {
      data.follow = follow 
      data.save(function (err, updatedata) {
        if (err) throw err;
        console.log('修改收藏列表成功: ' + updatedata);
        res.json(updatedata);
      })
    }
  })
})

// 根据问题的一个回答的ID, 获取该问题的部分信息
// req.params: id:String
// return {id : String, title : String, reply : [{}], replyIndex: Number}
router.get('/reply/:id', function (req, res, next) {
  let str = req.params.id
  quesiton.find({ "reply._id": str }, function (err, data) {
    if (err) {
      res.json('服务器异常')
    }
    else {
      let result = {}
      result.id = data[0]._id
      result.title = data[0].title
      result.reply = data[0].reply
      let reply = data[0].reply
      for (let i = 0; i < reply.length; i++) {
        // console.log("_id" in reply[i])
        // console.log(reply[i]._id)
        if (str == reply[i]._id) {
          result.replyIndex = i
          break;
        }
      }
      res.json(result)
    }
  })
});

// 根据问题的一个回答的ID, 修改收藏列表
// req.params: id:String
// req.body: array of collect
// return Object of reply
router.put('/reply/:id/modifyCollect', function (req, res, next) {
  let str = req.params.id
  let collect = req.body
  quesiton.find({ "reply._id": str }, (err, data) => {
    if (err) {
      res.json('服务器异常');
    }
    else {
      let index = 0
      for (let i = 0; i < data[0].reply.length; i++) {
        if (str == data[0].reply[i]._id) {
          data[0].reply[i].collect = collect
          index = i
          break;
        }
      }
      data[0].save(function (err, updatedata) {
        if (err) throw err;
        console.log('修改收藏列表成功: ' + updatedata);
        res.json(updatedata.reply[index]);
      })
    }
  })
})

// 根据问题的一个回答的ID, 修改感谢列表
// req.params: id:String
// req.body: array of thank
// return Object of reply
router.put('/reply/:id/modifyThank', function (req, res, next) {
  let str = req.params.id
  let thank = req.body
  quesiton.find({ "reply._id": str }, (err, data) => {
    if (err) {
      res.json('服务器异常');
    }
    else {
      let index = 0
      for (let i = 0; i < data[0].reply.length; i++) {
        if (str == data[0].reply[i]._id) {
          data[0].reply[i].thank = thank
          index = i
          break;
        }
      }
      data[0].save(function (err, updatedata) {
        if (err) throw err;
        console.log('修改感谢列表成功: ' + updatedata);
        res.json(updatedata.reply[index]);
      })
    }
  })
})

// 根据问题的一个回答的ID, 修改不赞同列表
// req.params: id:String
// req.body: array of down
// return Object of reply
router.put('/reply/:id/modifyDown', function (req, res, next) {
  let str = req.params.id
  let down = req.body
  quesiton.find({ "reply._id": str }, (err, data) => {
    if (err) {
      res.json('服务器异常');
    }
    else {
      let index = 0
      for (let i = 0; i < data[0].reply.length; i++) {
        if (str == data[0].reply[i]._id) {
          data[0].reply[i].down = down
          index = i
          break;
        }
      }
      data[0].save(function (err, updatedata) {
        if (err) throw err;
        console.log('修改不赞同列表成功: ' + updatedata);
        res.json(updatedata.reply[index]);
      })
    }
  })
})

// 根据问题的一个回答的ID, 修改赞同列表
// req.params: id:String
// req.body: array of up
// return Object of reply
router.put('/reply/:id/modifyUp', function (req, res, next) {
  let str = req.params.id
  let up = req.body
  quesiton.find({ "reply._id": str }, (err, data) => {
    if (err) {
      res.json('服务器异常');
    }
    else {
      let index = 0
      for (let i = 0; i < data[0].reply.length; i++) {
        if (str == data[0].reply[i]._id) {
          data[0].reply[i].up = up
          index = i
          break;
        }
      }
      data[0].save(function (err, updatedata) {
        if (err) throw err;
        console.log('修改赞同列表成功: ' + updatedata);
        res.json(updatedata.reply[index]);
      })
    }
  })
})

module.exports = router;
