<template>
  <div>
    <v-container class="search-bar">
      <v-row no-gutters>
        <v-col cols="2">
          <v-img :src="locationIcon" width="60%"></v-img>
        </v-col>
        <v-col cols="8">
          <input type="text" class="search-input" />
          <!-- <van-search placeholder="请输入搜索关键词" class="search-input" />  -->
        </v-col>
        <v-col cols="2">
          <v-btn size="mini" min-width="2.2rem" min-height="0.6rem" class="btn"
            >搜索</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <v-spacer> </v-spacer>

    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banners" :key="index">
          <v-img :src="item.image" class="simgs"></v-img>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="cate">
      <div v-for="(cate, index) in category" :key="index">
        <div class="cate-bar">
          <p><img :src="cate.image" alt="" class="cateimgs" /></p>
          <span class="cate-text">{{ cate.mallCategoryName }}</span>
        </div>
      </div>
    </div>

    <div class="ad-banner">
      <v-img :src="advertise"></v-img>
    </div>

    <v-container class="swipe">
      <v-row><v-col cols="12" class="recommend-title">商品推荐</v-col></v-row>

      <v-row>
        <v-col cols="12">
          <swiper :options="swiperOptions">
            <swiper-slide v-for="(item, index) in recommend" :key="index">
              <v-img :src="item.image"></v-img>
              <div class="name">{{ item.goodsName }}</div>
              <div class="price">
                <span> ￥{{ item.price | moneyFilter }}</span>
                <span>(￥{{ item.mallPrice | moneyFilter }})</span>
              </div>
            </swiper-slide>
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            <!-- <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div> -->
          </swiper>
        </v-col>
      </v-row>
    </v-container>

    <div class="title">
      <floor-name :floorname1="floorName1"></floor-name>
    </div>
    <floor-component :floorData="floor1"></floor-component>
    <div>
      <floor-name :floorname2="floorName2"></floor-name>
    </div>
    <floor-component :floorData="floor2"></floor-component>
    <div>
      <floor-name :floorname3="floorName3"></floor-name>
    </div>
    <floor-component :floorData="floor3"></floor-component>

    <v-container class="hot">
      <v-row>
        <v-col cols="12" class="title">热卖商品</v-col>
      </v-row>
      <div class="hot-list">
        <v-row no-gutters>
          <v-col cols="6" v-for="(item, index) in hotGoods" :key="index">
            <goods-info
              :goodsId="item.goodsId"
              :goodsImage="item.image"
              :goodsName="item.name"
              :goodsPrice="item.price"
            ></goods-info>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'

import FloorComponent from '@/components/floorComponent.vue'
import FloorName from '@/components/floorName.vue'
import goodsInfo from '@/components/goodsInfoComponent.vue'
import { toMoney } from '@/filter/moneyFilter.js'
import url from '@/API/serviceAPI.config'
export default {
  components: {
    swiper,
    swiperSlide,
    floor1: [],
    floor2: [],
    floor3: [],
    // floor1_0: {},
    // floor1_1: {},
    // floor1_2: {},

    floorName1: '',
    floorName1: '',
    floorName1: '',
    FloorComponent,
    FloorName,
    goodsInfo,
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    },
  },
  data: () => ({
    locationIcon: require('../assets/images/location.png'),
    banners: [],
    category: [],
    advertise: '',
    recommend: [],
    hotGoods: [],
    swiperOptions: {
      slidesPerView: 3,
      spaceBetween: 30,
      autoplay: {
        delay: 2000,
        disableOnInteraction: true,
      },
      loop: true,
      // effect: 'cube',
      // cube: {
      //   slideShadows: true,
      //   shadow: true,
      //   shadowOffset: 100,
      //   shadowScale: 0.6,
      // },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        progressbarOpposite: true,
      },
    },
  }),
  created() {
    axios({
      // url: 'https://www.fastmock.site/mock/2c09351efd4d4728cfa9f54d8a2044dd/vue2-01/index',
      url: url.getShopingMallInfo,
      method: 'get',
    })
      .then((response) => {
        console.log(response)

        if (response.status == 200) {
          this.category = response.data.data.category
          this.banners = response.data.data.slides
          this.advertise = response.data.data.advertesPicture.PICTURE_ADDRESS
          this.recommend = response.data.data.recommend
          this.floor1 = response.data.data.floor1
          this.floor2 = response.data.data.floor2
          this.floor3 = response.data.data.floor3
          // this.floor1_0 = this.floor1[0]
          // this.floor1_1 = this.floor1[1]
          // this.floor1_2 = this.floor1[2]
          this.floorName1 = response.data.data.floorName.floor1
          this.floorName2 = response.data.data.floorName.floor2
          this.floorName3 = response.data.data.floorName.floor3
          this.hotGoods = response.data.data.hotGoods
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>

<style lang="scss" scoped>
.search-bar {
  text-align: center;
  // height: 3rem;
  background-color: #e5017d;
  // line-height: 3rem;
  // border: 1px solid black;
  clear: both;
}
.img {
  border: none;
  text-align: center;
  align-items: center;
}
.search-input {
  width: 100%;
  background-color: #e5017d;
  height: 1.3rem;
  background: none;
  border: none;
  border-bottom: 1px solid #fff;
  color: #fff;
}
.btn {
  height: 1rem;
  width: 1.5rem;
  text-align: center;
  align-items: center;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.simgs {
  max-height: 14rem;
  clear: both;
  max-width: 100%;
  overflow: hidden;
}
.cateimgs {
  width: 3rem;
  height: 3rem;
}
.cate {
  margin-top: 0.8rem;
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
}
.cate-text {
  font-size: 0.8rem;
}
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
.floor-container {
  width: 100%;
  border: 1px solid ddd;
}
.floor-row {
  width: 50%;
  border-right: 1px solid #ddd;
  // border: 1px solid red;
}
.floor-col {
  width: 50%;
  // border: 1px solid red;
}
.fimgs {
  width: 100%;
  height: 100%;
}
.img2 {
  border-bottom: 1px solid #ddd;
}
.rows {
  border-bottom: 1px solid #ddd;
}
.flimss {
  width: 100%;
  height: 100%;
}
.rules {
  border-bottom: 1px solid #ddd;
}

// .rules {
//   border-right: 1px solid #ddd;
// }

.rimg {
  width: 100%;
  height: 100%;
}
.title {
  font-size: 14px;
  align-items: center;
  text-align: center;
  /* font-size: 0.3rem;/ */
  /* height: 1rem;
  line-height: 1rem; */
  color: #e5017d;
  /* border-bottom: 1px solid #ddd; */
}
.hot {
  // height: 145rem;
  // overflow: hidden;/
  // background-color: #fff;
}
</style>
