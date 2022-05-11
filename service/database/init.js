const mongoose = require('mongoose')

const db = 'mongodb://localhost/smile-db'
const glob = require('glob')
const { resolve } = require('path')

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
exports.connect = () => {
  mongoose.connect(db)
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    mongoose.connection.on('disconnected', () => {
      console.log('********数据库断开*********')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出现错误，程序无法搞定，请认为处理......')
      }
    })
    mongoose.connection.on('error', (err) => {
      console.log('********数据库错误*********')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现错误，程序无法搞定，请认为处理......')
      }
    })
    mongoose.connection.once('open', () => {
      console.log('Mongodb connected successfully')
      resolve()
    })
  })
}
