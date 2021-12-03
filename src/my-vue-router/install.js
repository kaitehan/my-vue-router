import view from './components/view'
import link from './components/link'

export let _Vue = null // 将其导出，在其它文件中也可以使用Vue实例，而不需要单独的引入Vue的js文件
export default function install (Vue) {
  // 获取Vue构造函数
  _Vue = Vue
  _Vue.mixin({
    // 通过混入以后，所有的Vue实例中都会有beforeCreate方法
    beforeCreate () {
      // 判断是否为Vue 实例，如果条件成立为Vue 的实例，否则为其他对应的组件（因为在创建Vue实例的时候会传递选项options）
      if (this.$options.router) {
        // 通过查看源码发现，Vue实例会挂载到当前的私有属性  _routerRoot  属性上
        this._routerRoot = this

        this._router = this.$options.router

        // 调用index.js  文件中定义的init 方法
        this._router.init(this)

        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })

  // 完成组件注册
  Vue.component('router-view', view)
  Vue.component('router-link', link)

  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return this._routerRoot._router
    }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () {
      return this._routerRoot._route
    }
  })
}
