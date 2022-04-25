// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event', event)
  return db.collection(event.name).add({
    mobile: event.mobile,
    password: event.password,
    name: event.name,
    instructor: event.instructor
  })
}