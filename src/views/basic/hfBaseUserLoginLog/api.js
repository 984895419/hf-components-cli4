import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/hfBaseUserLoginLog'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'id', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'hfBaseUserLoginLog'
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
const tableFields = ['id', 'userId', 'loginType', 'loginTime', 'lastLoginIp', 'lastLoginFinger']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    id: [
      { required: true, message: vm.$t(getI18nName('id')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    userId: [
      { required: true, message: vm.$t(getI18nName('userId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    loginType: [
      { required: true, message: vm.$t(getI18nName('loginType')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    loginTime: [
      { required: true, message: vm.$t(getI18nName('loginTime')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    lastLoginIp: [
      { required: true, message: vm.$t(getI18nName('lastLoginIp')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    lastLoginFinger: [
      { required: true, message: vm.$t(getI18nName('lastLoginFinger')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
