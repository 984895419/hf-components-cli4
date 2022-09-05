// package/index.js
import baseBusinessCode from './baseBusinessCode' // 引入封装好的组件
import baseDictType from './baseDictType' // 引入封装好的组件
import baseDictValue from './baseDictValue' // 引入封装好的组件
import baseHandlerMappingController from './baseHandlerMappingController' // 引入封装好的组件
import baseHandlerMappingMethod from './baseHandlerMappingMethod' // 引入封装好的组件
import baseHelper from './baseHelper' // 引入封装好的组件
import baseI18bGroup from './baseI18bGroup' // 引入封装好的组件
import baseI18nLocale from './baseI18nLocale' // 引入封装好的组件
import baseJobInfo from './baseJobInfo' // 引入封装好的组件
import baseJobType from './baseJobType' // 引入封装好的组件
import baseLog from './baseLog' // 引入封装好的组件
import baseMetInfo from './baseMetInfo' // 引入封装好的组件
import baseRegexRule from './baseRegexRule' // 引入封装好的组件
import baseSystemConfig from './baseSystemConfig' // 引入封装好的组件
import baseTenant from './baseTenant' // 引入封装好的组件
import generator from './generator' // 引入封装好的组件
import hfBaseCompanyInfo from './hfBaseCompanyInfo' // 引入封装好的组件
import hfBaseDepartInfo from './hfBaseDepartInfo' // 引入封装好的组件
import hfBaseRightMenu from './hfBaseRightMenu' // 引入封装好的组件
import hfBaseRightRole from './hfBaseRightRole' // 引入封装好的组件
import hfBaseRightRoleOperate from './hfBaseRightRoleOperate' // 引入封装好的组件
import hfBaseRightRoleUser from './hfBaseRightRoleUser' // 引入封装好的组件
import hfBaseUserInfo from './hfBaseUserInfo/index.vue' // 引入封装好的组件
import hfBaseUserLoginInfo from './hfBaseUserLoginInfo' // 引入封装好的组件
import hfBaseUserLoginLog from './hfBaseUserLoginLog' // 引入封装好的组件
import preferenceSetting from './preferenceSetting' // 引入封装好的组件
const coms = [baseBusinessCode, baseDictType, baseDictValue, baseHandlerMappingController, baseHandlerMappingMethod,
  baseHelper, baseI18bGroup, baseI18nLocale, baseJobInfo, baseJobType, baseLog, baseMetInfo, baseRegexRule,
  baseSystemConfig, baseTenant, generator, hfBaseCompanyInfo, hfBaseDepartInfo, hfBaseRightMenu, hfBaseRightRole,
  hfBaseRightRoleOperate, hfBaseRightRoleUser, hfBaseUserInfo, hfBaseUserLoginInfo, hfBaseUserLoginLog,preferenceSetting
] // 将来如果有其它组件,都可以写到这个数组里

// 批量组件注册
const install = function(Vue) {
  coms.forEach((com) => {
    Vue.component(com.name, com)
  })
}

export default install // 这个方法以后再使用的时候可以被use调用
