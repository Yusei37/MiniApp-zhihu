const host = require('../../utils/host')
const formatTime = require('../../utils/util')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},

    questionTitle: '',
    questionId: '',
    replyIndex: 0,
    reply: [],
    replyShow: [],
    replyNumber: [],

    write: '写回答',
    writeImage: '/icon/write.png',    

    follow: '+ 关注',
    bgColor: '#b23aee',
    color: 'white',
    jump: 'onJump2Reply',
    jumpId: '',

    thank: '感谢',
    thankImage: '/icon/heart.png',
    thankColor: '#8a8a8a',

    collect: '收藏',
    collectImage: '/icon/collect.png',
    collectColor: '#8a8a8a',

    downImage: '/icon/down.png',

    up: '赞同',
    upImage: '/icon/up.png',
    upColor: '#8a8a8a'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let para = options.replyId
    console.log(para)
    that.setData({
      userInfo: app.globalData.userInfo
    })
    that.getQuestionDataByReplyId(para)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  onJump2Reply: function () {
    let that = this
    wx.navigateTo({
      url: '/pages/reply/reply?questionId=' + that.data.questionId
    })
  },

  onJump2Question: function() {
    let that = this 
    wx.navigateTo({
      url: '/pages/question/question?questionId=' + that.data.questionId
    })
  },

  onJump2Answer: function () {
    let that = this
    wx.navigateTo({
      url: '/pages/answer/answer?replyId=' + that.data.jumpId
    })
  },

  getQuestionDataByReplyId: function (replyId) {
    let that = this
    wx.request({
      url: host.host + '/question/reply/' + replyId,
      data: '',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log('ansewer request successed: ' + res)
        if (res.statusCode == 200) {
          let result = res.data
          console.log(result)
          for (let i = 0; i < result.reply.length; i++) {
            result.reply[i].time = formatTime.formatTime(new Date(result.reply[i].time))
          }
          let temp = result.reply[result.replyIndex]
          that.setData({
            questionTitle: result.title,
            questionId: result.id,
            reply: result.reply,
            replyShow: temp,
            replyIndex: result.replyIndex,
            replyNumber: result.reply.length
          })
          that.detailChange()
        }
        else {

        }

      },
      fail: function (res) {
        console.log('ansewer request failed: ' + res)
        wx.showToast({
          title: '数据加载失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: function (res) {
        console.log('ansewer request completed: ' + res)
      }
    })
  },

  detailChange: function() {
    let that = this
    let name = that.data.userInfo.nickName
    let reply = that.data.reply
    for (let i of reply) {
      if (i.name == name) {
        that.setData({
          write: '查看回答',
          writeImage: '/icon/watch_focus.png',
          jumpId: i._id,
          jump: 'onJump2Answer'
        })
        break
      }
    }
    let replyShow = that.data.replyShow
    for (let i of replyShow.thank) {
        if (i == name) {
          that.changeThank()
          break
        }
    }
    for (let i of replyShow.collect) {
      if (i == name) {
        that.changeCollect()
        break
      }
    }
    for (let i of replyShow.up) {
      if (i == name) {
        that.changeUp()
        break
      }
    }
    for (let i of replyShow.down) {
      if (i == name) {
        that.changeDown()
        break
      }
    }

    for (let i of that.data.userInfo.follow) {
      if (i.nickName == replyShow.name) {
        that.changeFollow()
        break
      }
    }
  },

  changeFollow: function () {
    let that = this
    if (that.data.follow == '+ 关注') {
      that.setData({
        follow: '已关注',
        bgColor: '#fff0f5',
        color: '#707070'
      })
    }
    else {
      that.setData({
        follow: '+ 关注',
        bgColor: '#b23aee',
        color: 'white'
      })
    }
  },

  changeThank: function() {
    let that = this
    if (that.data.thank == '感谢') {
      that.setData({
        thank: '已感谢',
        thankImage: '/icon/heart_focus.png',
        thankColor: '#1296db'       
      })
    }
    else {
      that.setData({
        thank: '感谢',
        thankImage: '/icon/heart.png',
        thankColor: '#8a8a8a'
      })      
    }
  },

  changeCollect: function () {
    let that = this
    if (that.data.collect == '收藏') {
      that.setData({
        collect: '已收藏',
        collectImage: '/icon/collect_focus.png',
        collectColor: '#1296db'
      })
    }
    else {
      that.setData({
        collect: '收藏',
        collectImage: '/icon/collect.png',
        collectColor: '#8a8a8a'
      })
    }
  },

  changeDown: function () {
    let that = this
    if (that.data.downImage == '/icon/down.png') {
      that.setData({
        downImage: '/icon/down_focus.png'
      })
      if (that.data.up == '已赞同') {
        that.changeUp()
      }
    }
    else {
      that.setData({
        downImage: '/icon/down.png'
      })
    }
  },

  changeUp: function () {
    let that = this
    if (that.data.up == '赞同') {
      that.setData({
        up: '已赞同',
        upImage: '/icon/up_focus.png',
        upColor: '#1296db'
      })
      if (that.data.downImage == '/icon/down_focus.png') {
        that.changeDown()
      }
    }
    else {
      that.setData({
        up: '赞同',
        upImage: '/icon/up.png',
        upColor: '#8a8a8a'
      })
    }
  },

  collectRequest: function () {
    let that = this
    let name = that.data.userInfo.nickName
    let sendData = that.data.replyShow.collect
    if (that.data.collect == '已收藏') {
      let index = -1
      for (let i = 0; i < sendData.length; i++) {
        if (name == sendData[i]) {
          index = i
          break
        }
      }
      sendData.splice(index)
    }
    else {
      sendData.push(name)
    }
    wx.request({
      url: host.host + '/question/reply/' + that.data.replyShow._id +'/modifyCollect',
      data: sendData,
      header: { 'content-type': 'application/json' },
      method: 'PUT',
      dataType: 'json',
      success: function (res) {
        console.log('collect request successed: ' + res)
        if (res.statusCode == 200) {
          let result = res.data
          console.log(result)
          result.time = formatTime.formatTime(new Date(result.time))
          that.setData({       
            replyShow: result
          })
          that.changeCollect()
        }
        else {

        }

      },
      fail: function (res) {
        console.log('collect request failed: ' + res)
        wx.showToast({
          title: '收藏更改失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: function (res) {
        console.log('collect request completed: ' + res)
      }
    })   
  },

  thankRequest: function () {
    let that = this
    let name = that.data.userInfo.nickName
    let sendData = that.data.replyShow.thank
    if (that.data.thank == '已感谢') {
      let index = -1
      for (let i = 0; i < sendData.length; i++) {
        if (name == sendData[i]) {
          index = i
          break
        }
      }
      sendData.splice(index)
    }
    else {
      sendData.push(name)
    }
    wx.request({
      url: host.host + '/question/reply/' + that.data.replyShow._id + '/modifyThank',
      data: sendData,
      header: { 'content-type': 'application/json' },
      method: 'PUT',
      dataType: 'json',
      success: function (res) {
        console.log('thank request successed: ' + res)
        if (res.statusCode == 200) {
          let result = res.data
          console.log(result)
          result.time = formatTime.formatTime(new Date(result.time))
          that.setData({
            replyShow: result
          })
          that.changeThank()
        }
        else {

        }

      },
      fail: function (res) {
        console.log('thank request failed: ' + res)
        wx.showToast({
          title: '感谢更改失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: function (res) {
        console.log('thank request completed: ' + res)
      }
    })
  },

  upRequest: function () {
    let that = this
    let name = that.data.userInfo.nickName
    let sendData = that.data.replyShow.up
    if (that.data.up == '已赞同') {
      let index = -1
      for (let i = 0; i < sendData.length; i++) {
        if (name == sendData[i]) {
          index = i
          break
        }
      }
      sendData.splice(index)
    }
    else {
      sendData.push(name)
    }
    wx.request({
      url: host.host + '/question/reply/' + that.data.replyShow._id + '/modifyUp',
      data: sendData,
      header: { 'content-type': 'application/json' },
      method: 'PUT',
      dataType: 'json',
      success: function (res) {
        console.log('up request successed: ' + res)
        if (res.statusCode == 200) {
          let result = res.data
          console.log(result)
          result.time = formatTime.formatTime(new Date(result.time))
          that.setData({
            replyShow: result
          })
          that.changeUp()
        }
        else {

        }

      },
      fail: function (res) {
        console.log('up request failed: ' + res)
        wx.showToast({
          title: '赞同更改失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: function (res) {
        console.log('up request completed: ' + res)
      }
    })
  },

  downRequest: function () {
    let that = this
    let name = that.data.userInfo.nickName
    let sendData = that.data.replyShow.down
    if (that.data.down == '/icon/down.png') {
      let index = -1
      for (let i = 0; i < sendData.length; i++) {
        if (name == sendData[i]) {
          index = i
          break
        }
      }
      sendData.splice(index)
    }
    else {
      sendData.push(name)
    }
    wx.request({
      url: host.host + '/question/reply/' + that.data.replyShow._id + '/modifyDown',
      data: sendData,
      header: { 'content-type': 'application/json' },
      method: 'PUT',
      dataType: 'json',
      success: function (res) {
        console.log('down request successed: ' + res)
        if (res.statusCode == 200) {
          let result = res.data
          console.log(result)
          result.time = formatTime.formatTime(new Date(result.time))
          that.setData({
            replyShow: result
          })
          that.changeDown()
        }
        else {

        }

      },
      fail: function (res) {
        console.log('down request failed: ' + res)
        wx.showToast({
          title: '不赞同更改失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: function (res) {
        console.log('down request completed: ' + res)
      }
    })
  },

  followRequest: function () {
    let that = this
    let name = that.data.replyShow.name
    let sendData = that.data.userInfo.follow
    if (that.data.follow == '已关注') {
      let index = -1
      for (let i = 0; i < sendData.length; i++) {
        if (name == sendData[i].nickName) {
          index = i
          break
        }
      }
      sendData.splice(index)
    }
    else {
      let followItem = {}
      followItem.nickName = name
      followItem.avatarUrl = that.data.replyShow.image
      sendData.push(followItem)
    }
    console.log(JSON.stringify(sendData))
    wx.request({
      url: host.host + '/user/' + that.data.userInfo._id + '/modifyFollow',
      data: sendData,
      header: { 'content-type': 'application/json' },
      method: 'PUT',
      dataType: 'json',
      success: function (res) {
        console.log('follow request successed: ' + res)
        if (res.statusCode == 200) {
          let result = res.data
          console.log(result)
          that.setData({
            userInfo: result
          })
          app.globalData.userInfo = result
          that.changeFollow()
        }
        else {

        }

      },
      fail: function (res) {
        console.log('follow request failed: ' + res)
        wx.showToast({
          title: '关注更改失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: function (res) {
        console.log('follow request completed: ' + res)
      }
    })
  }
})