const host = require('../../utils/host')
const formatTime = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionTitle: '',
    questionId: '',
    replyNumber: 0,
    reply: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let para = options.replyId
    console.log(para)
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

  onJump2Question: function() {
    let that = this 
    wx.navigateTo({
      url: '/pages/question/question?questionId=' + that.data.questionId
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
          result.reply.time = formatTime.formatTime(new Date(result.reply.time))
          that.setData({
            questionTitle: result.title,
            questionId: result.id,
            replyNumber: result.replyLength,
            reply: result.reply
          })
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
  }
})