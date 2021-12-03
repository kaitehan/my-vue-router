import install from './install'
import createMatcher from '@/my-vue-router/create-matcher'
import HashHistory from './history/hash'
import HTML5History from './history/HTML5'
export default class VueRouter {
  // 创建VueRouter对象的时候，会传递选项
  constructor (options) {
    // 获取options中的routes数组，routes中定义了路由规则
    this._routes = options.routes || []
    this.matcher = createMatcher(this._routes)

    // 获取传递过来的选项中的model，model中决定了用户设置的路由的形式
    // 这里给VueRouter添加了model属性
    const model = this.model = options.model || 'hash'
    switch (model) {
      case 'hash':
        this.history = new HashHistory(this)
        break
      case 'history':
        this.history = new HTML5History(this)
        break
      default:
        throw new Error('model error')
    }
  }

  // 注册路由变化的事件 参数是Vue的实例
  init (Vue) {
    const history = this.history
    const setUpListener = () => {
      history.setUpListener()
    }
    // 如果直接history.setUpListener()
    // 这样的话setUpListener里面的this会有问题
    history.transitionTo(history.getCurrentLocation(),
    // 如果直接history.setUpListener
    // 这样的话setUpListener里面的this会有问题
      setUpListener)
    // 调用父类中的listen方法
    history.listen(route => {
      Vue._route = route
    })
  }
  // init (Vue) {}
}

// 将install方法挂载到VueRouter上
VueRouter.install = install
