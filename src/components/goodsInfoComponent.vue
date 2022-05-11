<template>
  <div>
    <div class="" @click="goGoodsPage">
      <div class="himg"><v-img :src="goodsImage"></v-img></div>
      <div class="hname">{{ goodsName }}</div>
      <div class="hprice">￥{{ goodsPrice | moneyFilter }}元</div>
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  props: ['goodsImage', 'goodsName', 'goodsPrice', 'goodsId'],
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    },
  },
  methods: {
    goGoodsPage() {
      this.$router.push({ path: '/detail', query: { goodsId: this.goodsId } })
      console.log(this.goodsId)
    },
  },
}
</script>

<style lang="scss" scoped>
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.swiper {
  width: 100%;
  height: 400px;
  background: seashell;
}
.name {
  font-size: 0.8rem;
  padding: 0 0.1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  word-wrap: break-word;
}
.price {
  font-size: 0.8rem;
}
span:nth-child(1) {
  color: #e5017d;
  margin-left: 0.1rem;
}
span:nth-child(2) {
  color: #e5017d;
}
.himg {
}
.hname {
  font-size: 0.8rem;
  padding: 0 0.1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  word-wrap: break-word;
}
.hprice {
  font-size: 0.8rem;
  padding: 0 0.1rem;
}
</style>
