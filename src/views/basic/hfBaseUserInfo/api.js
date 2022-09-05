import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/hfBaseUserInfo'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'userId', {
  pageUrl: baseUrl + '/pageQuery',
  syncUrl: baseUrl + '/sync'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'hfBaseUserInfo'
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
const tableFields = ['userId', 'userCode', 'userName', 'pkOrg', 'pkDept', 'gender', 'mobile', 'email', 'ncUserId', 'userFrom', 'creatorUserName', 'createTime', 'modifierUserName', 'modifyTime', 'enableState', 'deleted', 'headPic', 'id', 'effectTime']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    userId: [
      { required: true, message: vm.$t(getI18nName('userId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    userCode: [
      { required: true, message: vm.$t(getI18nName('userCode')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    userName: [
      { required: true, message: vm.$t(getI18nName('userName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    pkOrg: [
      { required: true, message: vm.$t(getI18nName('pkOrg')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    pkDept: [
      { required: true, message: vm.$t(getI18nName('pkDept')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    gender: [
      { required: true, message: vm.$t(getI18nName('gender')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    mobile: [
      { required: true, message: vm.$t(getI18nName('mobile')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    email: [
      { required: true, message: vm.$t(getI18nName('email')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    ncUserId: [
      { required: true, message: vm.$t(getI18nName('ncUserId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    userFrom: [
      { required: true, message: vm.$t(getI18nName('userFrom')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
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
    headPic: [
      { required: true, message: vm.$t(getI18nName('headPic')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    id: [
      { required: true, message: vm.$t(getI18nName('id')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    effectTime: [
      { required: true, message: vm.$t(getI18nName('effectTime')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
