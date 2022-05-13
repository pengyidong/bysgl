// pages/userDetail/userDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  edit() {
    // 获取用户输入信息
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
      name: 'recruimentAdd',
      data: {
        info,
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '添加成功',
        duration: 2000,
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 2000)
    })
  }
})