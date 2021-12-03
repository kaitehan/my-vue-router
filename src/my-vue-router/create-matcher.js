import createRouteMap from './create-route-map'
import createRoute from './util/route'
export default function creareMatcher (routes) {
  const { pathList, pathMap } = createRouteMap(routes)
  // console.log('pathList=', pathList)
  // console.log('pathMap=', pathMap)

  // 实现match方法 这个方法的作用就是根据路径，返回创建出的路由规则对象 { 路径 ，对应的路由记录的信息 }
  function match (path) {
    const record = pathMap[path]
    if (record) {
      // 根据路由地址，创建route路由规则对象
      return createRoute(record, path)
    }
    return createRoute(null, path)
  }
  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap)
  }
  return {
    match,
    addRoutes
  }
}
