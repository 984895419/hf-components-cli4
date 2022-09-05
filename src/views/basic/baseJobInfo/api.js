import { defaultUrlMethod } from '@/components/CURD/defaultUrl'
/**
 * 单点登录认证管理模块基础地址
 * @type {string}
 */
export const baseUrl = '/api/baseJobInfo'
/**
 * 基础查询地址
 * @type {{pageUrl: string}}
 */
export const urlMethods = defaultUrlMethod(baseUrl, 'jobId', {
  pageUrl: baseUrl + '/pageQuery',
  startUrl: baseUrl + '/start/{jobId}',
  stopUrl: baseUrl + '/stop/{jobId}',
  restartUrl: baseUrl + '/restart/{jobId}'
})
/**
 * 定义模块的命名空间
 * @type {string}
 */
const modelName = 'baseJobInfo'
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
const tableFields = ['jobId', 'jobName', 'triggerType',
  'triggerTime', 'jobDescription', 'jobData',
  'jobTypeId', 'jobTypeName', 'creatorUserName', 'createTime',
  'modifierUserName', 'modifyTime', 'enableState', 'deleted',
  'tenantId', 'runState', 'finishTime', 'startTime', 'endTime',
  'nextFireTime', 'previousFireTime', 'executeState']

export default exportTableFields(tableFields)

/**
 * 字段的验证规则
 * @param vm
 * @returns {{clientId: {trigger: string, message: *, required: boolean}[]}}
 */
export function formRules(vm) {
  return {
    jobId: [
      { required: true, message: vm.$t(getI18nName('jobId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    jobName: [
      { required: true, message: vm.$t(getI18nName('jobName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    jobDescription: [
      { required: true, message: vm.$t(getI18nName('jobDescription')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    jobData: [
      { required: true, message: vm.$t(getI18nName('jobData')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    jobTypeId: [
      { required: true, message: vm.$t(getI18nName('jobTypeId')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    jobTypeName: [
      { required: true, message: vm.$t(getI18nName('jobTypeName')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
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
    ],
    runState: [
      { required: true, message: vm.$t(getI18nName('runState')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ],
    finishTime: [
      { required: true, message: vm.$t(getI18nName('finishTime')) + vm.$t('common.notAllowedNull'), trigger: 'blur' }
    ]
  }
}
