// pages/recruitmentDetail/recruitmentDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    type: '',
    mobile: '',
    id: ''
  },
  onLoad(e) {
    this.setData({
      id: e.id
    })
    this.getData(e.id)
    let mobile = wx.getStorageSync('mobile') || ''
    let type = wx.getStorageSync('type') || ''
    this.setData({
      mobile,
      type
    })
  },
  onShow(){
    this.getData(this.data.id)
  },
  goto(){
    wx.navigateTo({
      url: `/pages/recruitmentEdit/recruitmentEdit?id=${this.data.id}`,
    })
  },
  call() {
    let mobile = this.data.info.mobile
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },
  // 删除招聘信息
  del() {
    let id = this.data.id
    wx.showModal({
      title: '删除',
      content: '是否删除该招聘信息？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'recruimentDel',
            data: {
              id
            }
          }).then(ressu => {
            wx.navigateBack({
              delta: 1
            })
          })
        } else if (res.cancel) {}
      }
    })
  },
  // 获取招聘信息详情
  getData(id) {
    wx.cloud.callFunction({
      name: 'recruimentDetail',
      data: {
        id
      }
    }).then(res => {
      this.setData({
        info: res.result.data
      })
    })
  }
})