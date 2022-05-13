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
  onShow() {
    // 页面显示时刷新数据
    this.getdata()
  },
  // 获取招聘信息列表
  getdata() {
    wx.cloud.callFunction({
      name: 'recruimentList',
    }).then(res => {
      this.setData({
        list: res.result.data
      })
    })
  },
  // 跳转至增加招聘信息页面
  gotoAdd() {
    wx.navigateTo({
      url: `/pages/recruitmentAdd/recruitmentAdd`,
    })
  },
  // 跳转至招聘详情页面
  goto(e) {
    wx.navigateTo({
      url: `/pages/recruitmentDetail/recruitmentDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
})