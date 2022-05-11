import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vant from 'vant'
import 'vant/lib/index.css'

// import VueAwesomeSwiper from 'vue-awesome-swiper'

// // import style (>= Swiper 6.x)
// // import 'swiper/swiper-bundle.css'

// // import style (<= Swiper 5.x)
// import 'swiper/css/swiper.css'

Vue.config.productionTip = false
Vue.use(Vant)
// Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
