<template>
  <common-dialog-btn label="设置" type="text">
    <template v-slot="{closeDialog}">
      <user-setting-prefence-setting
        v-model="formData"
        :preference-alias="'FOR_USER'"
        :init-data="formData"
      >
        <template v-slot="{ preferenceData, doSave }">
          <el-form
            ref="form"
            :size="size"
            :model="preferenceData"
            :label-width="$attrs['label-width'] || 'auto'"
            v-bind="$attrs"
            @submit.native.prevent
          >
            <row-span-slot>
              <template v-slot="{ span }">
                <form-item-col-select
                  :span="span"
                  :value="preferenceData"
                  :prop="'fe.setting.tooltip'"
                  :list="[{ label: '是', value: true }, { label: '否', value: false }]"
                  label="是否显示用户帮助"
                />
              </template>
            </row-span-slot>
            <el-form-item>
              <div style="float: right">
                <el-button type="primary" native-type="submit" :size="size" icon="el-icon-search" @click="doSave(preferenceData, closeDialog)">{{ $t('common.submit') }}</el-button>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </user-setting-prefence-setting>
    </template>
  </common-dialog-btn>
</template>

<script>
    import UserSettingPrefenceSetting from './UserSettingPrefenceSetting'
    import { mapGetters } from 'vuex'
    import FormItemColDict from '../../../components/CURD/Form/formItemColDict'
    import CommonDialogBtn from '../../../components/CURD/Btns/CommonDialogBtn'
    import RowSpanSlot from '../../../components/CURD/Slot/RowSpanSlot'
    import FormItemColSelect from '../../../components/CURD/Form/formItemColSelect'
    export default {
        name: 'UserSetting',
        components: { FormItemColSelect, RowSpanSlot, CommonDialogBtn, FormItemColDict, UserSettingPrefenceSetting },
        data() {
            return {
                formData: {
                    'fe.setting.tooltip': this.$store.getters.helper
                }
            }
        },
        computed: {
            ...mapGetters([
                'size'
            ])
        }
    }
</script>

<style scoped>

</style>
