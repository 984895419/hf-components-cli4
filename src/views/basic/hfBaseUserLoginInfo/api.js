import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/hfBaseUserLoginInfo'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'userId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'hfBaseUserLoginInfo'
export const namespace = modelName

/**
 * 正则
 * @param name
 * @returns {string}
 */
export function getI18nName(name) {
  return modelName + '.' + name
}

const exportTableFields = (fields) => {
  return fields.map(t => {
    return { value: t }
  })
}

/**
 * 字段的配置，用在国际化及列表选择显示字段的时候
 * @type {*[]}
 */
const tableFields = ['userId', 'pwd', 'salt', 'lastLoginType', 'lastLoginTime', 'loginState', 'noChangePwd', 'lastLoginIp', 'lastLoginFinger']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    userId: [
      { required: true, message: vm.$t(getI18nName('userId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    pwd: [
      { required: true, message: vm.$t(getI18nName('pwd')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    salt: [
      { required: true, message: vm.$t(getI18nName('salt')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    lastLoginType: [
      { required: true, message: vm.$t(getI18nName('lastLoginType')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    lastLoginTime: [
      { required: true, message: vm.$t(getI18nName('lastLoginTime')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    loginState: [
      { required: true, message: vm.$t(getI18nName('loginState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    noChangePwd: [
      { required: true, message: vm.$t(getI18nName('noChangePwd')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    lastLoginIp: [
      { required: true, message: vm.$t(getI18nName('lastLoginIp')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    lastLoginFinger: [
      { required: true, message: vm.$t(getI18nName('lastLoginFinger')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
