// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection(event.name).where({
    mobile: event.mobile,
    password: event.password
  }).get()
}

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataBack = {}
      var datas = await db.collection(event.name).where({
        mobile: event.mobile,
        password: event.password
      }).get()
      console.log('datas', datas)
      let code = datas.result.data.length > 0 ? 200 : 201
      dataBack = {
        code: 200,
        data: {
          id: datas.result.data[0]._id,
          mobile: datas.result.data[0].mobile,
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