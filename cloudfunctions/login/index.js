// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event.result', event.result)
  // cloud.database.collection('students').where({
  //   mobile: event.result
  // })
  console.log('event', event)
  return 111111
}