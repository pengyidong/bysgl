Page({
  data: {
    active: 0,
    loginRadio: 'students',
    regRadio: 'students',
    columns: [],
    show: false,
    mobile: '',
    password: '',
    RegMobile: '',
    RegPassword: '',
    columnsName: '请选择',
    instructorID: '',
    username: ''
  },
  onLoad() {
    this.getList()
  },

  onConfirm(event) {
    this.setData({
      columnsName: event.detail.value.name,
      instructorID: event.detail.value._id,
      show: false
    });
  },
  onCancel() {
    this.setData({
      show: false
    });
  },
  getList() {
    wx.cloud.callFunction({
      name: 'teacherList',
    }).then(res => {
      let columns = []
      res.result.data.forEach(item => {
        columns.push(item.name)
      });
      this.setData({
        columns: res.result.data
      })
    })
  },
  onStudentId(event) {
    this.setData({
      mobile: event.detail
    })
  },
  onPassword(event) {
    this.setData({
      password: event.detail
    })
  },
  onLoginClick(event) {
    console.log(event)
    this.setData({
      loginRadio: event.target.dataset.name
    })
  },
  onName(event) {
    this.setData({
      username: event.detail
    })
  },
  onRegClick(event) {
    console.log(event)
    this.setData({
      regRadio: event.target.dataset.name
    })
  },
  onRegMobile(event) {
    this.setData({
      RegMobile: event.detail
    })
  },
  onRegPassword(event) {
    this.setData({
      RegPassword: event.detail
    })
  },
  onRegRadio(event) {
    this.setData({
      regRadio: event.detail,
    });
  },
  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  pickerOnChange(event) {
    this.setData({
      columnsName: event.detail.value
    })
  },

  onClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
  // 注册
  register() {
    wx.cloud.callFunction({
      name: 'register',
      data: {
        mobile: this.data.RegMobile,
        password: this.data.RegPassword,
        name: this.data.regRadio,
        instructor: this.data.columnsName,
        instructorID: this.data.instructorID,
        username: this.data.username
      }
    }).then(res => {
      if (res.result.data.code == 200) {
        wx.showToast({
          title: res.result.data.msg,
          duration: 2000,
          icon: 'success'
        })
        // 存储用户信息
        wx.setStorageSync('type', this.data.regRadio)
        wx.setStorageSync('mobile', this.data.RegMobile)
        wx.setStorageSync('id', this.data.id)
        wx.showToast({
          title: '注册成功',
          duration: 2000
        })
        // 等两秒跳转
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/info/info',
          })
        }, 2000)
      } else {
        wx.showToast({
          title: res.result.data.msg,
          duration: 2000,
          icon: 'none'
        })
      }
    })
  },
  // 用户登录
  onSubmit() {
    wx.cloud.callFunction({
      name: 'login',
      data: {
        mobile: this.data.mobile,
        password: this.data.password,
        name: this.data.loginRadio
      }
    }).then(res => {
      if (res.result.dataBack.code == 200) {
        wx.showToast({
          title: '登录成功',
          duration: 2000
        })
        // 存储用户信息
        wx.setStorageSync('type', this.data.loginRadio)
        wx.setStorageSync('mobile', res.mobile)
        wx.setStorageSync('id', res._id)
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/info/info',
          })
        }, 2000)
      } else {
        wx.showToast({
          title: '账号或密码错误',
          duration: 2000
        })
      }
    })
  }
});