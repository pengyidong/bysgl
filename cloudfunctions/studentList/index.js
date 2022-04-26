// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    try {
      var datas = await db.collection('teachers').
      where({
        mobile: event.mobile,
      }).get()
      console.log('teachers', datas)
      resolve({
        data: datas,
      })
    } catch (error) {
      console.log(error)
      if (!error.code) reject(error)
      resolve(error)
    }
  })


}