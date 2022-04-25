// pages/userDetail/userDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userMobile: '',
    type: '',
    id: '',
    name: "",
    position: "",
    base: "",
    contact: "",
    mobile: "",
    salary: "",
    info: "",
    employment: "",
    requirements: ""
  },
  onLoad(e) {
    let userMobile = wx.getStorageSync('mobile') || ''
    let type = wx.getStorageSync('type') || ''
    this.setData({
      userMobile,
      type,
      id: e.id
    })
    this.getdata()
  },
  getdata() {
    console.log('this.data.type', this.data.id)
    wx.cloud.callFunction({
      name: 'recruimentDetail',
      data: {
        id: this.data.id
      }
    }).then(res => {
      this.setData({
        name: res.result.data.name,
        position: res.result.data.position,
        base: res.result.data.base,
        contact: res.result.data.contact,
        mobile: res.result.data.mobile,
        salary: res.result.data.salary,
        info: res.result.data.info,
        employment: res.result.data.employment,
        requirements: res.result.data.requirements
      })
    })
  },
  edit() {
    let info = {
      name: this.data.name,
      position: this.data.position,
      base: this.data.base,
      contact: this.data.contact,
      mobile: this.data.mobile,
      salary: this.data.salary,
      info: this.data.info,
      employment: this.data.employment,
      requirements: this.data.requirements
    }
    wx.cloud.callFunction({
      name: 'recruimentEdit',
      data: {
        info,
        id: this.data.id
      }
    }).then(res => {
      
      if (res.result.stats.updated == 1) {
        wx.showToast({
          title: '更新成功',
          duration: 2000,
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      }
    })
  }
})