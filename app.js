// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: 'cloud1-2gg6cn1pcef0de6b'
    })

  },
  onShow() {
    let mobile = wx.getStorageSync('mobile') || ''
    let type = wx.getStorageSync('type') || ''
    console.log('type', type)
    console.log('mobile', mobile)
    if (type== '' || mobile == '') {
      wx.showToast({
        title: '登录态失效',
        duration: 2000,
      })
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }
  }
})