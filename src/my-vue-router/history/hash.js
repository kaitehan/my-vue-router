import History from './base'
export default class HashHistory extends History {
  constructor (router) {
    // 将路由对象传递给父类的构造函数
    super(router)
    // 由于没有添加this,为普通方法
    ensureSlash() // 确保首次访问的地址加上 #
  }

  // 获取hash模式#号后的内容  这里需要去除 #
  getCurrentLocation () {
    return window.location.hash.slice(1)
  }

  // 监听hashchange事件
  // 也就是监听路由地址的变化
  setUpListener () {
    window.addEventListener('hashchange', () => {
      // 当路由地址发生变化后，跳转到新的路由地址
      this.transitionTo(this.getCurrentLocation())
    })
  }
}
function ensureSlash () {
  // 判断当前是否有hash
  // 如果单击的是链接，肯定会有hash
  if (window.location.hash) {
    return
  }
  window.location.hash = '/'
}
