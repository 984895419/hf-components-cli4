import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseHelper'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'helperId', {
  pageUrl: baseUrl + '/pageQuery'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'baseHelper'
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
const tableFields = ['helperId', 'helperTitle', 'helperContent', 'helperAuthor', 'creator', 'createTime', 'modifier', 'modifyTime', 'enableState', 'deleted', 'menuId', 'menuIdName', 'CreatorUserName', 'ModifierUserName']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
        helperTitle: [
          { required: true, message: vm.$t(getI18nName('helperTitle')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        helperContent: [
          { required: true, message: vm.$t(getI18nName('helperContent')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        helperAuthor: [
          { required: true, message: vm.$t(getI18nName('helperAuthor')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        enableState: [
          { required: true, message: vm.$t(getI18nName('enableState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ],
        menuId: [
          { required: true, message: vm.$t(getI18nName('menuId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
        ]
  }
}
