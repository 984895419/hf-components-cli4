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
  pageUrl: baseUrl + '/pageQuery',
  // 从原生url中查询表信息
  originUrl: '/api/plus/queryTableInfo/',
  submitUrl: '/api/plus/generate/'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'generateCode'

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
const tableFields = ['columnName', 'columnType', 'comment', 'propertyType', 'type',
  'keyFlag', 'keyIdentityFlag', 'keyWords', 'supportSearch', 'supportKeywordSearch',
  'supportFuzzySearch', 'supportAdd',
  'supportUpdate', 'supportDelete', 'supportExport', 'supportImport', 'supportEmpty',
  'referType', 'codeReferKey', 'dictReferType', 'regexReferType', 'tableReferType', 'tableReferColumnName',
  'valueReferColumn']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    moduleName: [
      { required: true, message: vm.$t(getI18nName('moduleName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    packageName: [
      { required: true, message: vm.$t(getI18nName('packageName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    vuePath: [
      { required: true, message: vm.$t(getI18nName('vuePath')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    javaPath: [
      { required: true, message: vm.$t(getI18nName('javaPath')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
