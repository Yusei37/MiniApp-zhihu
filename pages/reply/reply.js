const app = getApp()
const host = require('../../utils/host')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionId: '',
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let para = options.questionId
    that.setData({
      questionId: para,
      userInfo: app.globalData.userInfo,
    })
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

  addReply: function (e) {
    let that = this
    let replyItem = {}
    replyItem.name = that.data.userInfo.nickName
    replyItem.image = that.data.userInfo.avatarUrl
    replyItem.content = e.detail.value.textarea
    wx.request({
      url: host.host + '/question/'+ that.data.questionId +'/addReply',
      data: replyItem,
      header: { 'content-type': 'application/json' },
      method: 'PUT',
      dataType: 'json',
      success: function (res) {
        console.log('reply request successed: ' + res)
        if (res.statusCode == 200) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () { 
            wx.navigateBack({
              delta: 1,
            })
           }, 2000);
        }
        else {
          wx.showToast({
            title: '发布失败',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        console.log('reply request failed: ' + res)
      },
      complete: function (res) {
        console.log('reply request completed: ' + res)
      },
    })
  }
})