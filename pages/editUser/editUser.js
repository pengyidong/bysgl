// pages/userDetail/userDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    type: '',
    id: '',
    name: "",
    instructor: "",
    studentId: "",
    mobile: "",
    class: "",
    age: "",
    IdNumber: "",
    employment: "",
    company: "",
    companyCode: "",
    address: "",
  },
  onLoad() {
    let mobile = wx.getStorageSync('mobile') || ''
    let type = wx.getStorageSync('type') || ''
    let id = wx.getStorageSync('id') || ''
    this.setData({
      mobile,
      type,
      id
    })
    this.getdata()
  },
  getdata() {
    wx.cloud.callFunction({
      name: 'userDetail',
      data: {
        type: this.data.type,
        mobile: this.data.mobile,
        id: this.data.id
      }
    }).then(res => {
      this.setData({
        id: res.result.data[0]._id,
        name: res.result.data[0].name,
        instructor: res.result.data[0].instructor,
        studentId: res.result.data[0].studentId,
        mobile: res.result.data[0].mobile,
        class: res.result.data[0].class,
        age: res.result.data[0].age,
        IdNumber: res.result.data[0].IdNumber,
        employment: res.result.data[0].employment,
        company: res.result.data[0].company,
        companyCode: res.result.data[0].companyCode,
        address: res.result.data[0].address,
      })
    })
  },
  edit() {
    // 获取用户输入的数据
    let userDetail = {
      name: this.data.name,
      instructor: this.data.instructor,
      studentId: this.data.studentId,
      mobile: this.data.mobile,
      class: this.data.class,
      age: this.data.age,
      IdNumber: this.data.IdNumber,
      employment: this.data.employment,
      company: this.data.company,
      companyCode: this.data.companyCode,
      address: this.data.address,
    }
    wx.cloud.callFunction({
      name: 'userEdit',
      data: {
        type: this.data.type,
        mobile: this.data.mobile,
        userDetail,
        id: this.data.id
      }
    }).then(res => {
      if (res.result.stats.updated == 1) {
        wx.showToast({
          title: '更新成功',
          duration: 2000,
        })
        // 两秒后返回上一级页面
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      }
    })
  }
})