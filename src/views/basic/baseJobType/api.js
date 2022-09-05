import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseJobType'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'jobTypeId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'baseJobType'
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
const tableFields = ['jobTypeId', 'jobTypeName', 'jobTypeKey', 'jobComponentPath', 'javaExpression', 'creatorUserName', 'createTime', 'modifierUserName', 'modifyTime', 'enableState', 'deleted', 'tenantId']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    jobTypeId: [
      { required: true, message: vm.$t(getI18nName('jobTypeId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    jobTypeName: [
      { required: true, message: vm.$t(getI18nName('jobTypeName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    jobTypeKey: [
      { required: true, message: vm.$t(getI18nName('jobTypeKey')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    jobComponentPath: [
      { required: true, message: vm.$t(getI18nName('jobComponentPath')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
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
    ],
    tenantId: [
      { required: true, message: vm.$t(getI18nName('tenantId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
