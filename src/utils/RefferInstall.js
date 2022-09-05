/**
 * 参照引用工具类
 */
const install = function(Vue) {
  const requireAll = require.context('@/views/', true, /Refer\.vue/)
  const modulList = requireAll.keys().map(item => requireAll(item))
  modulList.forEach(({
                       default: modulObj
                     }) => {
    Vue.component(modulObj.name, modulObj)
  })
}
export default install
