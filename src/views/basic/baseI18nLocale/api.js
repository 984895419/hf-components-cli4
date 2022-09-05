import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseI18nLocale'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'localeId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'baseI18nLocale'
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
const tableFields = ['localeId', 'locale', 'content', 'groupId', 'groupName']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    localeId: [
      { required: true, message: vm.$t(getI18nName('localeId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    locale: [
      { required: true, message: vm.$t(getI18nName('locale')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    content: [
      { required: true, message: vm.$t(getI18nName('content')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    groupId: [
      { required: true, message: vm.$t(getI18nName('groupId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    groupName: [
      { required: true, message: vm.$t(getI18nName('groupName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
