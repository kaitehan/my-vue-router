// // 注册插件
// Vue.use(VueRouter)
// // 创建路由对象
// const router = new VueRouter({
//   routes: [
//     { name: 'home', path: '/', component: homeComponent }
//   ]
// })
// // 创建Vue实例，注册router对象
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#apps')
// <router-link to="/users"> 用户管理</router-link>

// 全局变量 用于保存Vue的构造方法
let _Vue = null
export default class VueRouter {
  // 调用install方法的时候，会传递Vue的构造函数
  static install (Vue) {
    // 1.判断插件是否安装，如果已经安装，则不需要重复安装
    if (VueRouter.install.installed) {
      return
    }
    // 静态函数其实也是一个对象，可以给函数添加installed属性
    VueRouter.install.installed = true

    // 2.将 Vue 的构造函数保存到全局变量中
    _Vue = Vue

    // 3.将router对象注册到Vue实例中  利用混入技术
    _Vue.mixin({
      beforeCreate () {
        // 在创建Vue实例的时候 调用此方法
        // 也就是new Vue()的时候，才会有$options这个属性，
        // 组件中是没有$options这个属性的。
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  // 类的构造方法
  constructor (options) {
    // options这个对象存放的是路由规则对象
    // 该对象存储的是 options 解析出来的路由规则
    this.options = options

    // routeMap 结构是键值对， 键： 路由地址  ，值：组件  ， 记录了路由地址和组件的对应关系
    this.routeMap = {}
    // 创建响应式对象，记录当前激活的路由
    this.data = _Vue.observable({
      current: '/'
    })
  }

  // `createRouteMap`方法，该方法会把构造函数中传入进来的`options`参数中的路由规则，转换成键值对的形式存储到`routeMap`中。 键就是路由的地址，值就是对应的组件
  createRouteMap () {
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  // 在上面的代码中，我们通过`Vue.component`来创建`router-link`这个组件，同时通过`props`接收`to`属性传递过来的值，并且对应的类型为字符串。
  initComponents (Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: '<a :herf="to"><slot></slot></a>'
      // 渲染虚拟DOM
      render (h) {
        // 创建虚拟DOM并返回
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler (e) {
          // 跳转到对应的地址
          history.pushState({}, '', this.to)
          // 更新router-view
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })
    // 保存当前VueRouter实例
    const self = this
    Vue.component('router-view', {
      // 渲染虚拟DOM
      render (h) {
        // 获取当前路由对应的组件
        const component = self.routeMap[self.data.current]
        // 创建虚拟DOM组件
        return h(component)
      }
    })
  }

  initEvent () {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }

  // 初始化
  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }
}
