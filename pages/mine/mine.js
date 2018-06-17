const app = getApp()
const host = require('../../utils/host')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menus: [
      { url: '', name: '我的关注', icon: 'follow.png', bgcolor: '#44ea2a' },
      { url: '', name: '我的收藏', icon: 'star.png', bgcolor: '#13227a' },
      { url: '', name: '最近浏览', icon: 'recently.png', bgcolor: '#cdcdcd' },
      { url: '', name: '我的创作', icon: 'book.png', bgcolor: '#1afa29' },
      { url: '', name: '我的Live', icon: 'lighting.png', bgcolor: '#1296db' },
      { header: true },
      { url: '', name: '反馈与帮助', icon: 'flag.png', bgcolor: '#8a8a8a' },
      { header: true },
      { url: '', name: '设置', icon: 'setting.png', bgcolor: '#8a8a8a' },
    ],
    favor: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    let that = this
    let result = e.detail.errMsg.split(':')[1]
    console.log(result)
    if (result === 'ok') {
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      }),
      that.myLogin()
    }
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
  
  myLogin: function () {
    let that = this
    console.log(that.data.userInfo.nickName)
    wx.request({
      url: host.host + '/user/login/' + that.data.userInfo.nickName,
      data: '',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log('mine request successed: ' + res) 
        if (res.statusCode == 200) {
          that.setData({
            favor: res.data
          })
        }
        else {
          fail()
        }
      },
      fail: function(res) {
        console.log('mine request failed: ' + res) 
      },
      complete: function(res) {
        console.log('mine request completed: ' + res)
      },
    })
  }
})