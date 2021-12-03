import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

Vue.config.productionTip = false

// 运行时版本的vue  脚手架使用的是运行时版
// 不支持template模板 ，需要打包时提前编译

// 完整版VUE 包比较大
// 包含运行时版和编译器  编译器会将模板转换成render函数
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
