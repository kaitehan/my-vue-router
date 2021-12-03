export default function createRouteMap (routes, oldPathList, oldPathMap) {
  const pathList = oldPathList || []
  const pathMap = oldPathMap || {}

  // 遍历所有的路由规则，进行解析。同时还要考虑children的形式
  // 所以这里需要使用递归 的方式
  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap)
  })

  return {
    pathList,
    pathMap
  }
}

// 解析路由规则
function addRouteRecord (route, pathList, pathMap, parentRecord) {
  // 从路由规则中获取path
  const path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path
  // 构建记录
  const record = {
    path,
    component: route.component,
    parent: parentRecord // 如果是子路由的话，记录子路由对应的父record对象（该对象中有path，component）,相当于记录了父子关系
  }
  // 如果已经有了path，相同的path直接跳过
  if (!pathMap[path]) {
    pathList.push(path)
    pathMap[path] = record
  }
  // 判断route中是否有子路由
  if (route.children) {
    // 遍历所有子路由，把子路由添加到pathList,pathMap中
    route.children.forEach(childRoute => {
      addRouteRecord(childRoute, pathList, pathMap, record)
    })
  }
}
