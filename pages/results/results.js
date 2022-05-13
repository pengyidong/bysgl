// pages/userDetail/userDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    achievementList: [],
    mobile: '',
    type: '',
    id: ''
  },
  onLoad(e) {
    let mobile = wx.getStorageSync('mobile') || ''
    let type = e.type || wx.getStorageSync('type') || ''
    let id = e.id || wx.getStorageSync('id') || ''
    this.setData({
      mobile,
      type,
      id
    })
  },
  onShow() {
    this.getdata()
  },
  // 成绩查询
  getdata() {
    wx.cloud.callFunction({
      name: 'userDetail',
      data: {
        type: this.data.type,
        mobile: this.data.mobile,
        id: this.data.id
      }
    }).then(res => {
      let achievementList = res.result.data[0].achievementList
      this.setData({
        achievementList
      })
    })
  },
  edit() {
    wx.navigateTo({
      url: '/pages/editUser/editUser',
    })
  },
})