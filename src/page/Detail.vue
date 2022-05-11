<template>
  <div>
    <!-- <v-card flat>
    <v-container fluid>
      <v-row class="child-flex">
        <div>
          <v-toolbar>
             <v-icon color="black darken-2" @click="onClickLeft">mdi-arrow-left</v-icon>
             <v-toolbar-title class="center">商品详情</v-toolbar-title>
             <v-spacer></v-spacer>
          </v-toolbar>
        </div>  
      </v-row>
    </v-container>
  </v-card> -->

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="white" flat>
            <v-btn icon light>
              <v-icon color="grey darken-2" @click="onClickLeft">
                mdi-arrow-left
              </v-icon>
            </v-btn>

            <v-toolbar-title class="grey--text text--darken-4">
              商品详情
            </v-toolbar-title>

            <v-btn icon light>
              <v-icon color="grey darken-2"> mdi-magnify </v-icon>
            </v-btn>
          </v-toolbar>

          <v-spacer></v-spacer>
          <v-img :src="goodsInfo.IMAGE1"></v-img>
          <v-subheader class="name">{{ goodsInfo.NAME }}</v-subheader>

          <v-subheader class="price"
            >￥{{ goodsInfo.PRESENT_PRICE | moneyFilter }} 元</v-subheader
          >
        </v-card>
        <v-col cols="12" class="detail-cols">
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="black"
            grow
            swipeable
            sticky
          >
            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item">
              <v-card color="basil" flat elevation="5">
                <v-card-text
                  v-html="goodsInfo.DETAIL"
                  class="detail"
                ></v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-col>
    </v-row>

    <!-- <v-footer class="mt-12"></v-footer> -->

    <v-bottom-navigation class="foot">
      <v-btn color="error" class="btn">
        <span @click="addGoodsToCart">加入购物车</span>
      </v-btn>

      <v-btn color="success" class="btn">
        <span>直接购买</span>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/API/serviceAPI.config'
import { toMoney } from '@/filter/moneyFilter.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      goodsId: '',
      goodsInfo: {},
      tab: null,
      items: ['商品详情', '评价'],
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId
    console.log(this.goodsId)
    this.axiosGetDetail()
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },

    axiosGetDetail() {
      axios({
        url: url.DetailInfo,
        method: 'post',
        data: {
          goodsId: this.goodsId,
        },
      })
        .then((response) => {
          console.log(response)
          if (response.data.code == 200 && response.data.message) {
            this.goodsInfo = response.data.message
          } else {
            Toast('服务器错误，数据获取失败')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    addGoodsToCart() {
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : []
      let isHaveGoods = cartInfo.find((cart) => cart.goodsId == this.goodsId)
      console.log(isHaveGoods)
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1,
        }
        cartInfo.push(newGoodsInfo)
        localStorage.cartInfo = JSON.stringify(cartInfo)
        Toast.success('添加成功')
      } else {
        Toast.success('已有此商品')
      }
      this.$router.push({ name: 'cart' })
    },
  },
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
.name {
  background-color: #fff;
}
.price {
  background-color: #fff;
}
.detail-cols {
  width: 100%;
  // border: 1px solid red;
}
.detail {
  font-size: 0px;
  width: 100%;
}
.btn {
  border-radius: 1.5rem;
  bottom: 50px;
  left: 0px;
  background-color: #fff;
  width: 100%;
}
.foot {
  position: fixed;
}
</style>
