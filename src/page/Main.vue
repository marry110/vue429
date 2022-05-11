<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view />
      </keep-alive>

      <van-tabbar v-model="active" @change="changeTabbar(active)" class="tab">
        <van-tabbar-item icon="shop">首页</van-tabbar-item>
        <van-tabbar-item icon="records">列表页</van-tabbar-item>
        <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
        <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      nowPath: '',
    }
  },
  created() {
    this.changeTabBarActive()
  },
  update() {
    this.changeTabBarActive()
  },
  methods: {
    changeTabBarActive() {
      this.nowPath = this.$route.path
      if (this.nowPath == '/cart') {
        this.active = 2
      }
    },
    changeTabbar(active) {
      console.log(active)
      switch (active) {
        case 0:
          this.$router.push({ name: 'ShopMall' })
          break
        case 1:
          this.$router.push({ name: 'categorylist' })
          break
        case 2:
          this.$router.push({ name: 'cart' })
          break
        case 3:
          this.$router.push({ name: 'Detail' })
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.main-div {
}
.tab {
  margin-bottom: 0.3rem;
  border: 1px solid #ddd;
}
</style>
