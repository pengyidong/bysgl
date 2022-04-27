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
        if (event.name == 'students') {
          data = {
            mobile: event.mobile,
            password: event.password,
            instructor: event.instructor,
            instructorID: event.instructorID,
            name: event.username,
          }
        } else {
          data = {
            mobile: event.mobile,
            password: event.password,
            name: event.username,
            studentIds: []
          }
        }
        var result = await db.collection(event.name).add({
          data
        })
        console.log('result', event.instructorID)
        if (result._id == undefined || result._id == "") {
          dataBack = {
            errCode: 201,
            msg: "增加失败"
          }
        } else {
          if (event.name == 'students') {
            const name = event.username
            const id = result._id
            let bd = await db.collection('teachers').doc(event.instructorID).update({
              data: {
                studentIds: _.push({
                  name,
                  id
                })
              }
            });
            if (bd.stats.updated == 0) {
              dataBack = {
                code: 201,
                msg: '绑定失败'
              }
            } else {
              dataBack = {
                code: 200,
                msg: '注册成功',
                id: result._id
              }
            }
          } else {
            dataBack = {
              code: 200,
              msg: '注册成功',
              id: result._id
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