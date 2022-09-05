import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseHandlerMappingMethod'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'methodId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'baseHandlerMappingMethod'
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
const tableFields = ['methodId', 'controllerId', 'value', 'description', 'displayName', 'creatorUserName', 'createTime', 'modifierUserName', 'modifyTime', 'enableState', 'deleted']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    methodId: [
      { required: true, message: vm.$t(getI18nName('methodId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    controllerId: [
      { required: true, message: vm.$t(getI18nName('controllerId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    value: [
      { required: true, message: vm.$t(getI18nName('value')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    description: [
      { required: true, message: vm.$t(getI18nName('description')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    displayName: [
      { required: true, message: vm.$t(getI18nName('displayName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    creator: [
      { required: true, message: vm.$t(getI18nName('creator')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    createTime: [
      { required: true, message: vm.$t(getI18nName('createTime')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    modifier: [
      { required: true, message: vm.$t(getI18nName('modifier')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    modifyTime: [
      { required: true, message: vm.$t(getI18nName('modifyTime')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    enableState: [
      { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    deleted: [
      { required: true, message: vm.$t(getI18nName('deleted')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
