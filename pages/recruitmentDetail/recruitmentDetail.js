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
  del() {
    let id = this.data.id
    wx.showModal({
      title: '删除',
      content: '是否删除该职位？',
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
  getData(id) {
    wx.cloud.callFunction({
      name: 'recruimentDetail',
      data: {
        id
      }
    }).then(res => {
      console.log('res', res)
      this.setData({
        info: res.result.data
      })
    })
  }
})