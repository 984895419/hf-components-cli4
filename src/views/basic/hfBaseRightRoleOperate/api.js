import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/hfBaseRightRoleOperate'
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
const modelName = 'hfBaseRightRoleOperate'
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
const tableFields = ['id', 'menuId', 'tenantId', 'methodId', 'roleId']

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
    menuId: [
      { required: true, message: vm.$t(getI18nName('menuId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    tenantId: [
      { required: true, message: vm.$t(getI18nName('tenantId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    methodId: [
      { required: true, message: vm.$t(getI18nName('methodId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    roleId: [
      { required: true, message: vm.$t(getI18nName('roleId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
