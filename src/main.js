import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import router from './router'
import i18n from './lang' // internationalization
import hfui from 'hf-ui'
import 'hf-ui/hf-ui.css'
Vue.use(hfui)
Vue.config.productionTip = false
Vue.config.productionTip = false
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
