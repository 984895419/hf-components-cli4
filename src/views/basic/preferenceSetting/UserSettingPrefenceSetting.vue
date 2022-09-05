<template>
  <preference-setting-api-slot
    v-model="stringData"
    :preference-type="preferenceType"
    :preference-alias="preferenceAlias"
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
    import PreferenceSettingApiSlot from './PreferenceSettingApiSlot'
    export default {
        name: 'UserSettingPrefenceSetting',
        components: { PreferenceSettingApiSlot },
        props: {
            /**
             * 偏好别名
             */
            preferenceAlias: {
                type: String,
                default: 'FOR_USER'
            },
            initData: {
                type: [Object, Boolean, String]
            }
        },
        data() {
            return {
                preferenceType: 'SYSTEM_SETTINGS',
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
                    this.$emit('input', this.initData)
                }
            }
        }
    }
</script>

<style scoped>

</style>
