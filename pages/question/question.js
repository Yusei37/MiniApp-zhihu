const host = require('../../utils/host')
const formatTime = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let para = options.questionId
    console.log(para)
    that.getQuestionDataById(para)
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

  onJump2Answer: function (e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/answer/answer?replyId=' + e.currentTarget.id
    })
  },

  getQuestionDataById: function (id) {
    let that = this
    wx.request({
      url: host.host + '/question/' + id,
      data: '',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log('question request successed: ' + res)
        if (res.statusCode == 200) {
          let result = res.data
          console.log(result)
          for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].reply.length; j++)
              result[i].reply[j].time = formatTime.formatTime(new Date(result[i].reply[j].time))
          }
          that.setData({
            question: result
          })
        }
        else {

        }

      },
      fail: function (res) {
        console.log('question request failed: ' + res)
        wx.showToast({
          title: '数据加载失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: function (res) {
        console.log('question request completed: ' + res)
      }
    })
  }
})