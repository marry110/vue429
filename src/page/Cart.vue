<template>
  <div class="box">
    <v-card color="white lighten-4" flat tile class="title">
      <v-toolbar dense>
        <v-btn icon light>
          <v-icon color="grey darken-2" @click="onClickLeft">
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <v-toolbar-title>购物车</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon light>
          <v-icon color="grey darken-2"> mdi-magnify </v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-row>
      <v-col cols="12">
        <v-btn class="btn" outlined color="error" @click="clearCart"
          >清空</v-btn
        >
      </v-col>
    </v-row>

    <v-spacer></v-spacer>
    <v-row
      v-for="(item, index) in cartInfo"
      :key="index"
      class="cartbox"
      @click="goGoodsPage(item.goodsId)"
    >
      <v-col cols="4">
        <v-img :src="item.image" width="90%"></v-img>
      </v-col>
      <v-col cols="5">
        <div>{{ item.name }}</div>
        <div class="pand-control">
          <van-stepper
            v-model="item.count"
            theme="round"
            button-size="15"
            disable-input
          ></van-stepper>
        </div>
      </v-col>
      <v-col cols="3" class="price">
        <div class="pang-goods-price">
          <div>￥{{ item.price | moneyFilter }}</div>
          <div>{{ item.count }}</div>
          <div class="allPrice">
            ￥{{ (item.price * item.count) | moneyFilter }}元
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="card"
          >总价格 : ￥{{ totalMoney | moneyFilter }} 元</v-card
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false,
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    },
  },
  created() {
    this.getCartInfo()
  },
  computed: {
    totalMoney() {
      let allMoney = 0
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count
      })
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return allMoney
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo)
      }
      console.log('this.cartInfo:' + JSON.stringify(this.cartInfo))
      this.isEmpty = this.cartInfo.length > 0 ? true : false
    },
    clearCart() {
      localStorage.removeItem('cartInfo')
      this.cartInfo = []
    },
    goGoodsPage(id) {
      this.$router.push({ path: '/detail', query: { goodsId: id } })
      console.log(this.goodsId)
    },
    // goGoodsPage() {
    //   this.$router.push({ path: '/detail', query: { goodsId: this.goodsId } })
    //   console.log(this.goodsId)
    // },
  },
}
</script>

<style lang="scss" scoped>
.btn {
  text-align: right;
  position: absolute;
  right: 1px;
  margin-bottom: 50px;
}
.cartbox {
  margin-top: 50px;
  text-align: left;
  align-items: center;
  font-size: 0.25rem;
  overflow: scroll;
  height: 8rem;
}
.pand-control {
  margin-top: 1rem;
  font-size: 0.25rem;
}
.price {
  color: #e5017d;
}
.card {
  color: #e5017d;
  padding-left: 65%;
  font-size: 0.5rem;
  font-weight: bold;
}
.box {
  height: 150rem;
}
.title {
  // position: fixed;
}
</style>
