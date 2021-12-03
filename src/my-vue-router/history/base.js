// router属性，路由对象（ViewRouter)
// current:{path:'/',matched:[]}
// transitionTo()
import createRoute from '../util/route'

export default class History {
  // router路由对象VueRouter
  constructor (router) {
    this.router = router
    this.current = createRoute(null, '/')
    // 这个回调函数是在hashhistory中赋值，作用是更改vue实例上的_route，_route的值发生变化，视图会进行刷新操作
    this.cb = null
  }

  // 给cb赋值
  listen (cb) {
    this.cb = cb
  }

  transitionTo (path, onComplete) {
    this.current = this.router.matcher.match(path)
    // console.log(this.current)

    // 调用cb
    this.cb && this.cb(this.current)
    // 该回调函数在调用transitionTo方法的时候，会传递过来
    onComplete && onComplete()
  }
}
