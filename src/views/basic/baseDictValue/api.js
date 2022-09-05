import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseDictValue'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'valueId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'baseDictValue'
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
const tableFields = ['valueId', 'typeCode', 'name', 'dictKey', 'dictValue', 'enableState']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    valueId: [
      { required: true, message: vm.$t(getI18nName('valueId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    typeCode: [
      { required: true, message: vm.$t(getI18nName('typeCode')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    name: [
      { required: true, message: vm.$t(getI18nName('name')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    dictKey: [
      { required: true, message: vm.$t(getI18nName('dictKey')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    dictValue: [
      { required: true, message: vm.$t(getI18nName('dictValue')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    enableState: [
      { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
