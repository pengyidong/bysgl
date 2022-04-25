Page({
  data: {
    active: 0,
    radio: '1',
    columns: ['高金丽', '赵四', '刘能', '谢广坤'],
    show: false,
    mobile: '',
    password: ''
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
  onChange(event) {
    this.setData({
      radio: event.detail,
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
    const {
      picker,
      value,
      index
    } = event.detail;
  },

  onClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
  onShow() {
    wx.cloud.callFunction({
      name: 'login',
      data: {
        mobile: this.data.mobile,
        password: this.data.password
      }
    }).then(res => [
      console.log(res)
    ])
  },
  onSubmit() {
    wx.cloud.callFunction({
      name: 'login',
      data: {
        mobile: this.data.mobile,
        password: this.data.password
      }
    }).then(res => [
      console.log(res)
    ])
  }
});