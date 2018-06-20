var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const host = require('../../utils/host')
const formatTime = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    tabs: ["关注", "推荐", "热榜"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    questionData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    that.getQuestionData()
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

  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  upper: function() {
    let that = this
    wx.showNavigationBarLoading()
    console.log("upper");
    that.getMoreQuestionData("upper")
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1000);
  },
  lower: function(e) {
    wx.showNavigationBarLoading();
    let that = this;
    console.log("lower")
    that.getMoreQuestionData("lower")
    setTimeout(function() {
      wx.hideNavigationBarLoading();
    }, 1000);
  },

  onJump2Answer: function (e) {
    let that = this
    let replyId = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/answer/answer?replyId=' + replyId
    })
  },

  OnJump2Write: function() {
    wx.navigateTo({
      url: '/pages/write/write'
    })
  },

  getQuestionData: function () {
    let that = this
    wx.request({
      url: host.host + '/question',
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
              result[i].reply.time = formatTime.formatTime(new Date(result[i].reply.time))
          }
          that.setData({
            questionData: result
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
  },

  getMoreQuestionData: function (obj) {
    let that = this
    wx.request({
      url: host.host + '/question',
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
            result[i].reply.time = formatTime.formatTime(new Date(result[i].reply.time))
          }
          let newData = []
          if (obj == 'upper') {
            newData = result.concat(that.data.questionData)
          }
          else {
            newData = that.data.questionData.concat(result)
          }
          that.setData({
            questionData: newData
          }),
          wx.showToast({
            title: '数据加载成功',
            icon: 'success',
            duration: 2000
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