import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseLog'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'reqId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'baseLog'
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
const tableFields = ['reqId', 'requestUrl', 'requestHeaders', 'responseHeaders', 'requestMethod', 'requestIp', 'requestParams', 'requestBody', 'responseBody', 'responseStatus', 'creatorUserName', 'createTime']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    reqId: [
      { required: true, message: vm.$t(getI18nName('reqId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    requestUrl: [
      { required: true, message: vm.$t(getI18nName('requestUrl')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    requestMethod: [
      { required: true, message: vm.$t(getI18nName('requestMethod')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    requestIp: [
      { required: true, message: vm.$t(getI18nName('requestIp')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    requestParams: [
      { required: true, message: vm.$t(getI18nName('requestParams')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    requestBody: [
      { required: true, message: vm.$t(getI18nName('requestBody')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    responseBody: [
      { required: true, message: vm.$t(getI18nName('responseBody')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    responseStatus: [
      { required: true, message: vm.$t(getI18nName('responseStatus')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    creator: [
      { required: true, message: vm.$t(getI18nName('creator')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    createTime: [
      { required: true, message: vm.$t(getI18nName('createTime')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
