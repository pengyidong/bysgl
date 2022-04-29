// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataBack = ""
      var datas = await db.collection('students').
      doc(event.id).get()
      dataBack = datas.data

      resolve({
        data: dataBack,
      })
    } catch (error) {
      console.log(error)
      if (!error.code) reject(error)
      resolve(error)
    }
  })
}