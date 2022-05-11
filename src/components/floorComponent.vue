<template>
  <div>
    <div>{{ floorName }}</div>
    <v-container fluid class="floor-container justify-space-between">
      <v-row no-gutters class="rows">
        <v-col cols="6" class="floor-row">
          <v-img :src="floorData0.image" class="fimgs"> </v-img>
        </v-col>
        <v-col cols="6" class="floor-col flex-wrap">
          <div class="img2">
            <v-img :src="floorData1.image" alt="" class="flimss" />
          </div>
          <div>
            <v-img :src="floorData2.image" alt="" class="flimss" />
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="6"
          v-for="(item, index) in floorData.slice(3)"
          :key="index"
        >
          <div class="rules">
            <img :src="item.image" alt="" class="rimg" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['floorData', 'floorName'],
  data() {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {},
    }
  },

  watch: {
    floorData: function (val) {
      // console.log(this.floorData)
      this.floorData0 = this.floorData[0]
      this.floorData1 = this.floorData[1]
      this.floorData2 = this.floorData[2]
      // console.log(this.floorData0)
      // console.log(this.floorData1)
      // console.log(this.floorData2)
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>
