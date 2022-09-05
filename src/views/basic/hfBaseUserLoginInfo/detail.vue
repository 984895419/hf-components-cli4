<template>
  <common-dialog-btn :label="$t('common.look')" type="text">
    <el-form ref="form" :model="value">
      <row-span-slot>
        <template v-slot="{ span }">
                    <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="userId" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="pwd" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="salt" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="lastLoginType" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="lastLoginTime" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="loginState" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="noChangePwd" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="lastLoginIp" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="lastLoginFinger" />
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
        name: 'HfBaseUserLoginInfoDetail',
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
