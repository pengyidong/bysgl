// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'students'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = wx.getStorageSync('type') || ''
    this.setData({
      type
    })
  },
  logout() {
    wx.removeStorageSync('type')
    wx.removeStorageSync('mobile')
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },
  goto(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }
})