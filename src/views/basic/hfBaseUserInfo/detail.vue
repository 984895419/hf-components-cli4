<template>
  <common-dialog-btn :label="$t('common.look')" type="text">
    <el-form ref="form" :model="value">
      <row-span-slot>
        <template v-slot="{ span }">
                    <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="userId" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="userCode" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="userName" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="pkOrg" >
            {{value.pkOrgName}}
          </form-item-text>
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="pkDept">
            {{value.pkDeptName}}
          </form-item-text>
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="gender" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="mobile" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="email" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="ncUserId" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="userFrom" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="creator" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="createTime" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="modifier" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="modifyTime" />
          <enable-state-form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="enableState" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="deleted" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="headPic" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="id" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="effectTime" />
        </template>
      </row-span-slot>
    </el-form>
  </common-dialog-btn>
</template>

<script>
    import * as conf from './api'
    import CommonDialogBtn from '@/components/CURD/Btns/CommonDialogBtn'
    import FormItemText from '@/components/CURD/Form/formItemText'
    import EnableStateFormItemText from '@/components/CURD/Form/EnableStateformItemText'
    import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
    export default {
        name: 'HfBaseUserInfoDetail',
        components: { RowSpanSlot, EnableStateFormItemText, FormItemText, CommonDialogBtn },
        props: {
            value: {
                type: Object,
                default: function() {
                    return {}
                }
            }
        },
        data() {
            return {
                conf: conf
            }
        }
    }
</script>

<style scoped>

</style>
