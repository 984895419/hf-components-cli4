<template>
  <preference-setting-api-slot
    ref="apiSlot"
    v-model="stringData"
    :preference-type="preferenceType"
    :preference-alias="preferenceAlias"
    :immediate="false"
    @loadAfter="loadAfter"
  >
    <template v-slot="{ preferenceData, doSave }">
      <slot
        :preferenceData="preferenceDataComputed"
        :doSave="saveHandler(doSave)"
      />
    </template>
  </preference-setting-api-slot>
</template>

<script>
/**
 * 代码生成器设置
 */
    import PreferenceSettingApiSlot from './PreferenceSettingApiSlot'
    export default {
        name: 'GeneratorPrefenceSetting',
        components: { PreferenceSettingApiSlot },
        props: {
            /**
             * 偏好别名
             */
            preferenceAlias: {
                type: String
            }
        },
        data() {
            return {
                preferenceType: 'CODE_GENERATOR',
                stringData: null,
                preferenceData: null
            }
        },
        computed: {
            preferenceDataComputed() {
                return this.preferenceData ? this.preferenceData : this.initData
            }
        },
        methods: {
          doQuery() {
            this.$refs.apiSlot.loadPreferenceSettings()
          },
          saveHandler(doSave) {
                return (data, cb) => {
                    doSave(JSON.stringify(data), cb)
                }
            },
            loadAfter() {
                if (this.stringData) {
                    if (!this.preferenceData) {
                        this.preferenceData = JSON.parse(this.stringData)
                    }
                    this.$emit('input', this.preferenceData)
                } else {
                    this.$emit('input', this.initData || {})
                }
            }
        }
    }
</script>

<style scoped>

</style>
