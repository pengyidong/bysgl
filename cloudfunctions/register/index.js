// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection(event.name).add({
    data: {
      mobile: event.mobile,
      password: event.password,
      instructor: event.instructor,
      name: event.username
    }
  })
}

// 云函数入口函数
exports.main = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataBack = ""
      var datas = await db.collection(event.name).
      where({
        mobile: event.mobile,
      }).get()
      dataBack = datas.data
      if (datas.data.length > 0) {
        dataBack = {
          code: 201,
          msg: '已注册'
        }
      } else {
        var result = await db.collection(event.name).add({
          data: {
            mobile: event.mobile,
            password: event.password,
            instructor: event.instructor,
            instructorID: event.instructorID,
            name: event.username
          }
        })
        console.log('result', event.instructorID)
        if (result._id == undefined || result._id == "") {
          dataBack = {
            errCode: 201,
            msg: "增加失败"
          }
        } else {
          if (event.name == 'students') {
            let bd = await db.collection(event.name).doc(event.instructorID).update({
              data: {
                studentIds: _.push({
                  name: event.username,
                  id: result._id
                })
              }
            });
            console.log('event.username', event.username)
            console.log('result._id', result._id)
            console.log('bd', bd)
            if (bd.stats.updated == 0) {
              dataBack = {
                code: 201,
                msg: '绑定失败'
              }
            } else {
              dataBack = {
                code: 200,
                msg: '注册成功'
              }
            }
          } else {
            dataBack = {
              code: 200,
              msg: '注册成功'
            }
          }

        }
      }
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