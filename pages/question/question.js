const host = require('../../utils/host')
const formatTime = require('../../utils/util')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    question: [],
    jump: 'onJump2Reply',
    jumpId: '',
    text: '添加回答',
    image: '/icon/answer.png',
    follow: '+ 关注问题',
    bgColor: '#b23aee',
    color: 'white'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let para = options.questionId
    console.log(para)
    that.setData({
      userInfo: app.globalData.userInfo
    })
    that.getQuestionDataById(para)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onJump2Reply: function() {
    let that = this
    wx.navigateTo({
      url: '/pages/reply/reply?questionId=' + that.data.question.questionId
    })
  },

  onJump2Answer: function(e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/answer/answer?replyId=' + e.currentTarget.id
    })
  },

  onJump2Answer2: function() {
    let that = this
    wx.navigateTo({
      url: '/pages/answer/answer?replyId=' + that.data.jumpId
    })
  },

  getQuestionDataById: function(id) {
    let that = this
    wx.request({
      url: host.host + '/question/' + id,
      data: '',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log('question request successed: ' + res)
        if (res.statusCode == 200) {
          let result = res.data
          console.log(result)
          for (let j = 0; j < result.reply.length; j++)
            result.reply[j].time = formatTime.formatTime(new Date(result.reply[j].time))
          that.setData({
            question: result
          })
          that.detailChange()
        } else {

        }

      },
      fail: function(res) {
        console.log('question request failed: ' + res)
        wx.showToast({
          title: '数据加载失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: function(res) {
        console.log('question request completed: ' + res)
      }
    })
  },

  detailChange: function() {
    let that = this
    let name = that.data.userInfo.nickName
    let reply = that.data.question.reply
    let follow = that.data.question.follow
    for (let i of reply) {
      if (i.name == name) {
        that.setData({
          text: '查看回答',
          writeImage: '/icon/watch.png',
          jumpId: i._id,
          jump: 'onJump2Answer2'
        })
        break;
      }
    }
    for (let i of follow) {
      if (i == name) {
        that.setData({
          follow: '已关注问题',
          bgColor: '#fff0f5',
          color: '#707070'
        })        
      }
    }
  },

  changeFollow: function() {
    let that = this
    if (that.data.follow == '+ 关注问题') {
      that.setData({
        follow: '已关注问题',
        bgColor: '#fff0f5',
        color: '#707070'
      })
    } else {
      that.setData({
        follow: '+ 关注问题',
        bgColor: '#b23aee',
        color: 'white'
      })
    }
  },

  followRequest: function () {
    let that = this
    let name = that.data.userInfo.nickName
    let sendData = that.data.question.follow
    if (that.data.follow == '已关注问题') {
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
      url: host.host + '/question/' + that.data.question._id + '/modifyFollow',
      data: sendData,
      header: { 'content-type': 'application/json' },
      method: 'PUT',
      dataType: 'json',
      success: function (res) {
        console.log('follow request successed: ' + res)
        if (res.statusCode == 200) {
          let result = res.data
          console.log(result)
          for (let j = 0; j < result.reply.length; j++)
            result.reply[j].time = formatTime.formatTime(new Date(result.reply[j].time))
          that.setData({
            question: result
          })
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
  },
})