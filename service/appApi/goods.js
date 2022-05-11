const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()
const Goods = require('../database/schema/Goods')
const CategorySub = require('../database/schema/CategorySub')
const Category = require('../database/schema/Category')

const fs = require('fs')
// 读取数据写道mongod数据库goods数据
router.get('/inserAllGoodsInfo', async (ctx) => {
  fs.readFile('./datajson/newgoods.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    data.map((value, index) => {
      console.log(value)
      let newGoods = new Goods(value)
      newGoods
        .save()
        .then(() => {
          saveCount++
          console.log('插入成功goods' + saveCount)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  })
  ctx.body = '开始insert goods data'
})
// 读取数据写道mongod数据库category数据
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./datajson/category.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    data.RECORDS.map((value, index) => {
      console.log(value)
      let newData = new Category(value)
      newData
        .save()
        .then(() => {
          saveCount++
          console.log('插入成功category' + saveCount)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  })
  ctx.body = '开始insrt category data'
})
// 读取数据写道mongod数据库categorysub数据
router.get('/inserCategorySub', async (ctx) => {
  fs.readFile('./datajson/category_sub.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    data.RECORDS.map((value, index) => {
      console.log(value)
      let newData = new CategorySub(value)
      newData.save().then(() => {
        saveCount++
        console.log('插入成功categorysub' + saveCount)
      })
    })
  })
  ctx.body = '开始insert categorusub data'
})
// 从数据库mongod中读取一条数据通过ID找到他
router.post('/getDetailGoodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    let result = await Goods.findOne({ ID: goodsId }).exec()
    ctx.body = {
      code: 200,
      message: result,
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err,
    }
  }
})
router.get('/getCategoryListData', async (ctx) => {
  try {
    let result = await Category.find().exec()
    ctx.body = {
      code: 200,
      message: result,
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err,
    }
  }
})

router.post('/geCategorySubListData', async (ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId
    // let categoryId = 1
    let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec()
    ctx.body = {
      code: 200,
      message: result,
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err,
    }
  }
})
router.post('/getGoodsListByCategorySubID', async (ctx) => {
  try {
    let categorysubId = ctx.request.body.categorysubId
    let page = ctx.request.body.page
    let num = 10
    let start = (page - 1) * num
    // let categorysubId = '2c9f6c946016ea9b016016f79c8e0000'
    let result = await Goods.find({ SUB_ID: categorysubId })
      .skip(start)
      .limit(num)
      .exec()
    ctx.body = {
      code: 200,
      message: result,
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err,
    }
  }
})
module.exports = router
