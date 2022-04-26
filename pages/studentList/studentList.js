// pages/studentList/studentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    mobile: null
  },
  onLoad() {
    let mobile = wx.getStorageSync('mobile') || ''
    this.setData({
      mobile
    })
    this.getdata()
  },
  goto(event) {
    wx.navigateTo({
      url: `/pages/studentDetail/studentDetail?id=${event.target.dataset.id}&type=students`,
    })
  },
  getdata() {
    wx.cloud.callFunction({
      name: 'studentList',
      data: {
        mobile: this.data.mobile,
      }
    }).then(res => {
      console.log('res', res)
      this.setData({
        list: res.result.data.data[0].studentIds
      })
    })
  }
})