// pages/userDetail/userDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [{
        title: '姓名',
        value: ""
      },
      {
        title: '指导老师',
        value: ""
      },
      {
        title: '学号',
        value: ""
      },
      {
        title: '手机号',
        value: ""
      },
      {
        title: '班级',
        value: ""
      },
      {
        title: '年龄',
        value: ""
      },
      {
        title: '身份证号',
        value: ""
      },
      {
        title: '是否就业',
        value: ""
      },
      {
        title: '企业名称',
        value: ""
      },
      {
        title: '社会信用代码',
        value: ""
      },
      {
        title: '工作地址',
        value: ""
      },
    ],
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
  edit() {
    wx.navigateTo({
      url: '/pages/editStudent/editStudent',
    })
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
      console.log('res', res)
      let userDetail = this.data.info
      userDetail[0].value = res.result.data[0].name
      userDetail[1].value = res.result.data[0].instructor
      userDetail[2].value = res.result.data[0].studentId
      userDetail[3].value = res.result.data[0].mobile
      userDetail[4].value = res.result.data[0].class
      userDetail[5].value = res.result.data[0].age
      userDetail[6].value = res.result.data[0].IdNumber
      userDetail[7].value = res.result.data[0].employment
      userDetail[8].value = res.result.data[0].company
      userDetail[9].value = res.result.data[0].companyCode
      userDetail[10].value = res.result.data[0].address
      this.setData({
        info: userDetail
      })
    })
  }
})