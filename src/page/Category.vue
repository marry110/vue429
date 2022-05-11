<template>
  <div>
    <v-card color="white lighten-4" flat tile>
      <v-toolbar dense>
        <v-btn icon light>
          <v-icon color="grey darken-2" @click="onClickLeft">
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <v-toolbar-title>类别列表</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon light>
          <v-icon color="grey darken-2"> mdi-magnify </v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-row no-gutters>
      <v-col cols="4">
        <v-card>
          <div id="leftNav">
            <ul>
              <li
                v-for="(item, index) in category"
                :key="index"
                :class="{ categoryActive: categoryIndex == index }"
                @click="clickCategory(index, item.ID)"
              >
                {{ item.MALL_CATEGORY_NAME }}
              </li>
            </ul>
          </div>
        </v-card>
      </v-col>
      <v-col cols="8">
        <!-- <v-tabs v-model="active" align-with-title @click="clickCategorySub">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="item in categorySub" :key="item">{{
            item.MALL_SUB_NAME
          }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="active" class="tabs1">
          <v-tab-item v-for="i in goodList" :key="i">
            <v-container class="justify-space-between">
              <v-row>
                <v-col cols="4">
                  <v-img :src="i.IMAGE1"></v-img>
                </v-col>
                <v-col cols="5">
                  {{ i.NAME }}
                </v-col>
                <v-col cols="3">￥{{ i.ORI_PRICE }}</v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs-items> -->

        <!-- <v-card>
          <v-tabs v-model="active">
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="item in categorySub" :key="item">
              {{ item.MALL_SUB_NAME }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="active">
            <v-tab-item v-for="i in goodList" :key="i">
              <v-container class="justify-space-between">
                <v-row>
                  <v-col cols="4">
                    <v-img :src="i.IMAGE1"></v-img>
                  </v-col>
                  <v-col cols="5">
                    {{ i.NAME }}
                  </v-col>
                  <v-col cols="3">￥{{ i.ORI_PRICE }}</v-col>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-card> -->

        <v-card class="">
          <!-- center-active
            dark -->
          <!-- gery accent-4 -->
          <!-- background-color="" -->
          <!-- <van-tabs v-model="active" @click="clickCategorySub">
            <van-tab v-for="(item, index) in categorySub" :key="index">
              {{ item.MALL_SUB_NAME }}
            </van-tab>
          </van-tabs> -->
          <van-tabs v-model="active" @click="clickCategorySub">
            <van-tab
              v-for="(item, index) in categorySub"
              :key="index"
              :title="item.MALL_SUB_NAME"
            ></van-tab>
          </van-tabs>
        </v-card>
        <div id="list-div">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              finished-text="没有更多了"
            >
              <!-- <van-cell
                v-for="(item, index) in goodList"
                :key="index"
                class="list-item"
                @click="goggoodsId(item.ID)"
              > -->
              <v-container
                class="categorybox"
                v-for="(item, index) in goodList"
                :key="index"
                @click="goggoodsId(item.ID)"
              >
                <v-row class="list-item">
                  <v-col cols="3">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </v-col>
                  <v-col cols="5">
                    <p>{{ item.NAME }}</p>
                  </v-col>
                  <v-col cols="4">
                    <p>￥{{ item.ORI_PRICE | moneyFilter }}元</p>
                  </v-col>
                </v-row>
              </v-container>
              <!-- </van-cell> -->
            </van-list>
          </van-pull-refresh>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/API/serviceAPI.config'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      list: [],
      finished: false,
      loading: false,
      isRefresh: false,
      page: 1,
      categorysubId: '',
      goodList: [],
      active: 0,
      errorImg: 'this.src="' + require('@/assets/images/erroring.png') + '"',
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    },
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 50 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 + 'px'
  },
  created() {
    this.getCategory()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },

    getCategory() {
      axios({
        url: url.getCategoryListData,
        method: 'get',
      })
        .then((response) => {
          console.log(response)
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message
            this.page = 1
            this.finished = false
            this.goodsList = []
            this.getCategorySubByCategoryID(this.category[0].ID)
            console.log(this.category[0].ID)
            console.log(response.data.message)
            console.log(this.category)
          } else {
            Toast('服务器错误，数据获取失败')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    clickCategory(index, categoryId) {
      this.categoryIndex = index
      this.page = 1
      this.finished = false
      this.goodList = []

      this.getCategorySubByCategoryID(categoryId)
    },

    getCategorySubByCategoryID(categoryId) {
      axios({
        url: url.geCategorySubListData,
        method: 'post',
        data: {
          categoryId: categoryId,
        },
      })
        .then((response) => {
          console.log(response)
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message
            this.active = 0
            this.onLoad()
            this.categorysubId = this.categorySub[0].ID
            console.log(this.categorySub)
          } else {
            Toast('服务器错误，数据获取失败')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // onLoad() {
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     this.loading = false
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 500)
    // },
    onLoad() {
      setTimeout(() => {
        this.categorysubId = this.categorysubId
          ? this.categorysubId
          : this.categorySub[0].ID
        this.getGoodsList()
        console.log(this.categorySub[0].ID)
        console.log(this.categorysubId)
      }, 500)
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        // this.list = []
        this.goodsList = []
        this.page = 1
        this.onLoad()
      }, 500)
    },

    getGoodsList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: 'post',
        data: {
          categorysubId: this.categorysubId,
          page: this.page,
        },
      })
        .then((response) => {
          console.log(response)
          if (response.data.code == 200 && response.data.message.length) {
            this.page++
            this.goodList = this.goodList.concat(response.data.message)
          } else {
            this.finished = true
          }
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },

    clickCategorySub(index, title) {
      this.categorysubId = this.categorySub[index].ID
      console.log('categorysubId:' + this.categorysubId)
      this.goodList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    },

    goggoodsId(id) {
      this.$router.push({ path: '/detail', query: { goodsId: id } })
      // this.$router.push({path: '/detail',query:{goodsId:this.goodsId}})
    },
  },
}
</script>

<style lang="scss" scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid black;
  padding: 3px;
  font-size: 0.8rem;
  color: #fff;
}
#leftNav {
  background: rgb(20, 20, 20);
}
.categoryActive {
  background-color: rgb(236, 98, 98);
}
.list-item {
  text-align: center;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
.categorybox {
  text-align: center;
  align-items: center;
  font-size: 0.2rem;
}
</style>
