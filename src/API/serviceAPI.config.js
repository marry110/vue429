const BASEURL =
  'https://www.fastmock.site/mock/2c09351efd4d4728cfa9f54d8a2044dd/vue2-01/'
const LOCALURL = 'http://localhost:3000/'

const URL = {
  getShopingMallInfo: BASEURL + 'index',

  getGoodsInfo: BASEURL + 'getGoodsInfo',

  registerUser: LOCALURL + 'user/register',

  loginUser: LOCALURL + 'user/login',

  DetailInfo: LOCALURL + 'goods/getDetailGoodsInfo',

  getCategoryListData: LOCALURL + 'goods/getCategoryListData',

  geCategorySubListData: LOCALURL + 'goods/geCategorySubListData',

  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID',
}
module.exports = URL
