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
    columnsName: '请选择'
  },
  onLoad() {
    this.getList()
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
        columns
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
  register() {
    wx.cloud.callFunction({
      name: 'register',
      data: {
        mobile: this.data.RegMobile,
        password: this.data.RegPassword,
        name: this.data.regRadio,
        instructor: this.data.columnsName
      }
    }).then(res => {
      wx.showToast({
        title: '注册成功',
        duration: 2000
      })
      wx.setStorageSync('type', this.data.regRadio)
      wx.setStorageSync('mobile', this.data.RegMobile)
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/info/info',
        })
      }, 2000)
    })
  },
  onSubmit() {
    wx.cloud.callFunction({
      name: 'login',
      data: {
        mobile: this.data.mobile,
        password: this.data.password,
        name: this.data.loginRadio
      }
    }).then(res => {
      if (res.result.data.length === 1) {
        wx.showToast({
          title: '登录成功',
          duration: 2000
        })
        wx.setStorageSync('type', this.data.loginRadio)
        wx.setStorageSync('mobile', res.result.data[0].mobile)
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