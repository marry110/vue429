const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./database/init.js')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')
app.use(bodyparser())
app.use(cors())

let user = require('./appApi/user')
let goods=require('./appAPi/goods')
// 装载路由模块
let router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())
// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
;(async () => {
  await connect()
  initSchemas()

  // const User = mongoose.model('User')
  // let oneUser = new User({ username: 'jspang2', password: '123456' })
  // oneUser.save().then(() => {
  //   console.log('插入成功')
  // })
})()

app.use(async (ctx) => {
  ctx.body = '<h1>i am jspang</h1>'
})
app.listen(3000, () => {
  console.log('server start at 3000')
})
