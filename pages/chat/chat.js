const app = getApp()
const host = require('../../utils/host')
const formatTime = require('../../utils/util')

let socketOpen = false
let socketMsgQueue = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    sendData: {},
    backImage: '',
    mq: [],
    inputVal: '',
    socktBtnTitle: '连接socket'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let name = options.nickName
    let avatarUrl = options.avatarUrl
    // console.log(name)
    // console.log(avatarUrl)
    // console.log("onLoad")
    let send = {}
    send.from = app.globalData.userInfo.nickName
    send.to = name
    that.setData({
      userInfo: app.globalData.userInfo,
      sendData: send,
      backImage: avatarUrl
    }),
    that.socketBtnTap()
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

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  onSend: function () {
    let that = this
    console.log(that.data.inputVal)
  },

  socketBtnTap: function () {
    let that = this
    let remindTitle = socketOpen ? '正在关闭' : '正在连接'
    wx.showToast({
      title: remindTitle,
      icon: 'loading',
      duration: 10000
    })
    if (!socketOpen) {
      //创建一个 WebSocket 连接；
      wx.connectSocket({
        url: host.wss,
      })
      //监听WebSocket错误
      wx.onSocketError(function (res) {
        socketOpen = false
        console.log('WebSocket连接打开失败，请检查！')
        that.setData({
          socktBtnTitle: '连接socket'
        })
        wx.hideToast()
      })
      //监听WebSocket连接打开事件。
      wx.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！')
        wx.hideToast()
        that.setData({
          socktBtnTitle: '断开socket'
        })
        socketOpen = true
        for (var i = 0; i < socketMsgQueue.length; i++) {
          that.sendSocketMessage(socketMsgQueue[i])
        }
        socketMsgQueue = []
      })
      //监听WebSocket接受到服务器的消息事件
      wx.onSocketMessage(function (res) {
        console.log('收到服务器内容：' + res.data)
        let mqItem = JSON.parse(res.data)
        mqItem.back = true
        mqItem.time = formatTime.formatTime(new Date())
        let mqNew = that.data.mq
        mqNew.push(mqItem)
        that.setData({
          mq: mqNew
        })
      })
      //监听WebSocket关闭
      wx.onSocketClose(function (res) {
        socketOpen = false
        console.log('WebSocket 已关闭！')
        wx.hideToast()
        that.setData({
          socktBtnTitle: '连接socket'
        })
      })
    } else {
      //关闭WebSocket连接。
      wx.closeSocket()
    }
  },

  sendSocketMessage: function (msg) {
    let that  = this
    if (socketOpen) {
      //通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
      wx.sendSocketMessage({
        data: msg
      })
      let mqItem = {}
      mqItem.content = (JSON.parse(msg)).content
      mqItem.time = formatTime.formatTime(new Date())
      let mqNew = that.data.mq
      mqNew.push(mqItem)
      that.setData({
        inputVal: '',
        mq: mqNew
      })
    } else {
      socketMsgQueue.push(msg)
    }
  },

  sendMessage: function () {
    let that = this
    let sendData = that.data.sendData
    sendData.content = that.data.inputVal
    this.sendSocketMessage(JSON.stringify(sendData))
  },
})