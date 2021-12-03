export default function createRoute (record, path) {
  // [parentRecord,childRecord]
  // `match`这个方法的作用就是根据路径，创建出路由规则对象，而所谓的路由规则对象其实就是包含了路径以及对应的路由记录的信息(这里有可能包含了父路由以及子路由记录，这块内容存储到一个数组中)。
  const matched = []
  while (record) {
    matched.unshift(record)
    record = record.parent
  }
  return {
    path,
    matched
  }
}
// router-view
