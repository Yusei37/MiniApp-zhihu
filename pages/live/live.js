const host = require('../../utils/host')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    liveData: [] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.getLiveData()
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

  getLiveData: function () {
    let that = this
    wx.request({
      url: host.host + '/live',
      data: '',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log('live request successed: ' + res)
        if (res.statusCode == 200) {
            let result = res.data 
            console.log(result.length)
            for (let i = 0; i < result.length; i++) {
              result[i].image = host.host + result[i].image
            }
            that.setData({
              liveData: result
            })
            wx.showToast({
              title: '加载成功',
              icon: 'success',
              duration: 2000
            })
        }
        else {

        }
        
      },
      fail: function (res) {
        console.log('live request failed: ' + res)   
          wx.showToast({
            title: '数据加载失败',
            icon: 'none',
            duration: 2000
          })
      },
      complete: function (res) {
        console.log('live request completed: ' + res)
      }
    })
  },

  onReloadData: function () {
    let that = this
    that.getLiveData()
  }
})