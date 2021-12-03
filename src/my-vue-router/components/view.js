export default {
  render (h) {
    // 获取当前匹配的路由规则对象
    const route = this.$route
    // const route = this.$router.history.current
    let depth = 0
    // 记录当前组件为RouterView
    this.routerView = true
    let parent = this.$parent
    while (parent) {
      if (parent.routerView) {
        depth++
      }
      parent = parent.$parent
    }
    // 获取路由记录对象
    // 如果是子路由，例如：子路由/about/users
    // 子路由是有两部分内容，matched[0]:是父组件内容，matched[1]是子组件内容
    const record = route.matched[depth]
    if (!record) {
      return h()
    }
    // 获取记录中对应的组件
    const component = record.component
    return h(component)
  }
}
