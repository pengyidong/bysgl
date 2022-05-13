// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var db = cloud.database()

// 云函数入口函数
// exports.main = async (event, context) => {
//   return db.collection(event.name).where({
//     mobile: event.mobile,
//     password: event.password
//   }).get()
// }

// 云函数入口函数 登录
exports.main = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataBack = {}
      var datas = await db.collection(event.name).where({
        mobile: event.mobile,
        password: event.password
      }).get()
      // 通过长度判断是否有数据
      let code = datas.data.length > 0 ? 200 : 201
      dataBack = {
        code: code,
        data: {
          id: datas.data[0]._id,
          mobile: datas.data[0].mobile,
        }
      }
      resolve({
        dataBack
      })
    } catch (error) {
      console.log(error)
      if (!error.code) reject(error)
      resolve(error)
    }
  })
}