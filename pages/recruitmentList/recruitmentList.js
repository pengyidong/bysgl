// pages/recruitmentList/recruitmentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  onLoad() {
    let mobile = wx.getStorageSync('mobile') || ''
    let type = wx.getStorageSync('type') || ''
    this.setData({
      mobile,
      type
    })
  },
  onShow(){
    this.getdata()
  },
  gotoAdd(){
    wx.navigateTo({
      url: `/pages/recruitmentAdd/recruitmentAdd`,
    })
  },
  goto(e) {
    wx.navigateTo({
      url: `/pages/recruitmentDetail/recruitmentDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  getdata() {
    wx.cloud.callFunction({
      name: 'recruimentList',
    }).then(res => {
      this.setData({
        list: res.result.data
      })
    })
  }
})