import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseBusinessCode'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'businessId', {
  pageUrl: baseUrl + '/pageQuery',
  // 获取下个编码
  nextCodeUrl: baseUrl + '/nextCode'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'baseBusinessCode'
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
const tableFields = ['businessId', 'businessKey', 'businessName', 'businessDescription', 'prefix', 'suffix', 'useDate', 'dateFormat', 'seqStart', 'seqStep', 'seqLength', 'seqCurrent', 'creatorUserName', 'createTime', 'modifierUserName', 'modifyTime', 'enableState', 'deleted', 'tenantId']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    businessId: [
      { required: true, message: vm.$t(getI18nName('businessId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    businessKey: [
      { required: true, message: vm.$t(getI18nName('businessKey')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    businessName: [
      { required: true, message: vm.$t(getI18nName('businessName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    businessDescription: [
      { required: true, message: vm.$t(getI18nName('businessDescription')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    useDate: [
      { required: true, message: vm.$t(getI18nName('useDate')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    dateFormat: [
      { required: true, message: vm.$t(getI18nName('dateFormat')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    seqStart: [
      { required: true, message: vm.$t(getI18nName('seqStart')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    seqStep: [
      { required: true, message: vm.$t(getI18nName('seqStep')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    seqLength: [
      { required: true, message: vm.$t(getI18nName('seqLength')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    seqCurrent: [
      { required: true, message: vm.$t(getI18nName('seqCurrent')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
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
