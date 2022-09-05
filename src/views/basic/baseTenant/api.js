import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseTenant'
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
const modelName = 'baseTenant'
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
const tableFields = ['id', 'tenantKey', 'tenantName', 'tenantDescription', 'tenantInit', 'creatorUserName', 'createTime', 'modifierUserName', 'modifyTime', 'enableState', 'initData', 'parentId', 'level', 'levelStr', 'sort']

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
    tenantKey: [
      { required: true, message: vm.$t(getI18nName('tenantKey')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    tenantName: [
      { required: true, message: vm.$t(getI18nName('tenantName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    tenantDescription: [
      { required: true, message: vm.$t(getI18nName('tenantDescription')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    tenantInit: [
      { required: true, message: vm.$t(getI18nName('tenantInit')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
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
    initData: [
      { required: true, message: vm.$t(getI18nName('initData')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    parentId: [
      { required: true, message: vm.$t(getI18nName('parentId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    level: [
      { required: true, message: vm.$t(getI18nName('level')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    levelStr: [
      { required: true, message: vm.$t(getI18nName('levelStr')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    sort: [
      { required: true, message: vm.$t(getI18nName('sort')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
