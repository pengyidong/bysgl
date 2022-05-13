// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // 删除招聘信息
  return cloud.database().collection('recruitment').doc(event.id).remove()
}