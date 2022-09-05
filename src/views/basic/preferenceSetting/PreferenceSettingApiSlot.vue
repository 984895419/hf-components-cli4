<template>
  <div>
    <slot :preferenceData="preferenceData" :doSave="doSave" />
  </div>
</template>

<script>
    import { baseApiGetMethod, baseApiPostMethod } from '@/components/CURD/baseApi'
    import { isSuccessResult, getMessage, getData } from '@/utils/ajaxResultUtil'

    export default {
        name: 'PreferenceSettingApiSlot',
        props: {
          preferenceType: {
              type: String
          },
          value: {
              type: String
          },
          /**
           * 偏好别名
           */
          preferenceAlias: {
              type: String,
              default: undefined
          },
          immediate: {
            type: Boolean,
            default: true
          }
        },
        data() {
            return {
                apiGetSetting: '/api/basePreferenceSetting/list/query',
                /**
                 * post的数据
                 */
                apiPostSetting: '/api/basePreferenceSetting/save',
                /**
                 * 偏好数据
                 */
                preferenceData: null
            }
        },
        created() {
          if (this.immediate === true) {
            this.loadPreferenceSettings()
          }
        },
        methods: {
            /**
             * 从远程加载配置
             */
            loadPreferenceSettings() {
                if (this.preferenceAlias) {
                    baseApiGetMethod(this.apiGetSetting,
                        { preferenceAlias: this.preferenceAlias,
                            preferenceType: this.preferenceType }).then(resp => {
                        if (isSuccessResult(resp)) {
                            const settings = getData(resp)
                            if (settings && settings[0] && settings[0].config) {
                                this.preferenceData = settings[0].config
                                this.$emit('input', this.preferenceData)
                            }
                        } else {
                            this.$message.error(getMessage(resp))
                        }
                        this.$emit('loadAfter')
                    })
                } else {
                    this.$emit('loadAfter')
                }
            },
            /**
             * 保存的方法
             * @param data
             * @param cb
             */
            doSave(data, cb) {
                baseApiPostMethod(this.apiPostSetting, {
                    preferenceType: this.preferenceType,
                    preferenceAlias: this.preferenceAlias,
                    config: data
                }).then(resp => {
                    if (isSuccessResult(resp)) {
                        this.$message({
                            message: getMessage(resp),
                            type: 'success'
                        })
                        this.$emit('input', data)
                        if (cb) {
                            cb()
                        }
                    } else {
                        this.$message({
                            message: getMessage(resp),
                            type: 'danger'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
