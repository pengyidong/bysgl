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
    // 页面加载时获取id
    this.setData({
      id: options.id
    })
    this.getData()
  },
  del(event) {
    let index = event.currentTarget.dataset.index
    let list = this.data.list || []
    list.splice(index, 1);
    this.setData({
      list
    })
  },
  // 获取学生成绩数据
  getData() {
    wx.cloud.callFunction({
      name: 'getResults',
      data: {
        id: this.data.id
      }
    }).then(res => {
      this.setData({
        list: res.result.data.achievementList || []
      })
    })
  },
  // 编辑学生成绩数据
  edit() {
    wx.cloud.callFunction({
      name: 'editresults',
      data: {
        id: this.data.id,
        achievementList: this.data.list || []
      }
    }).then(res => {
      console.log(res)
      if (res.result.data.stats.updated == 1) {
        wx.showToast({
          title: '更新成功',
          duration: 2000,
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      } else {
        wx.showToast({
          title: '更新失败',
          duration: 2000,
          icon: 'error'
        })
      }
    })
  },
  addCourse(event) {
    this.setData({
      course: event.detail
    })
  },
  getInput(event) {
    let list = this.data.list || []
    list[event.currentTarget.dataset.index].achievement = event.detail
    this.setData({
      list
    })
  },
  add() {
    let list = this.data.list || []
    let obj = {
      achievement: "",
      course: this.data.course
    }
    list.push(obj)
    this.setData({
      list,
      course: ''
    })
  }
})