// pages/editResults/editResults.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    list: [],
    course: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options.id)
    this.setData({
      id: options.id
    })
    this.getData()
  },
  addCourse(event) {
    this.setData({
      course: event.detail
    })
  },
  getInput(event) {
    console.log('event', event)
  },
  add() {
    let list = this.data.list
    let obj = {
      achievement: "",
      course: this.data.course
    }
    list.push(obj)
    this.setData({
      list,
      course: ''
    })
  },
  getData() {
    wx.cloud.callFunction({
      name: 'getResults',
      data: {
        id: this.data.id
      }
    }).then(res => {
      this.setData({
        list: res.result.data.achievementList
      })
    })
  }
})