const Router = require('koa-router')
const User = require('../database/schema/User')
let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = '这是用户的操作首页'
})

// router.get('/register', async (ctx) => {
//   ctx.body = '这是用户的注册界面'
// })

// router.post('/register', async (ctx) => {
//   console.log(ctx.request.body)
//   ctx.body = ctx.request.body
// })

router.post('/register', async (ctx) => {
  // User = mongoose.model('User')
  let newUser = new User(ctx.request.body)
  await newUser
    .save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: '注册成功',
      }
    })
    .catch((error) => {
      ctx.body = {
        code: 500,
        message: error,
      }
    })
})

router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  console.log(loginUser)
  let userName = loginUser.userName
  let password = loginUser.password
  await User.findOne({ userName: userName })
    .exec()
    .then(async (result) => {
      console.log(result)

      if (result) {
        let newUser = new User()
        await newUser
          .comparePassword(password, result.password)
          .then((isMatch) => {
            ctx.body = {
              code: 200,
              message: isMatch,
            }
          })
          .catch((error) => {
            console.log(error)
            ctx.body = {
              code: 500,
              message: error + '服务器异常',
            }
          })
      } else {
        ctx.body = {
          code: 200,
          message: '用户名不存在',
        }
      }
    })
    .catch((error) => {
      console.log(error)
      ctx.body = {
        code: 500,
        message: error,
      }
    })
})

module.exports = router
