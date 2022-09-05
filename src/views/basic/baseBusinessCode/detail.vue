<template>
  <common-dialog-btn :label="$t('common.look')" type="text">
    <el-form ref="form" :model="value">
      <row-span-slot>
        <template v-slot="{ span }">
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="businessId" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="businessKey" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="businessName" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="businessDescription" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="prefix" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="suffix" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="useDate" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="dateFormat" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="seqStart" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="seqStep" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="seqLength" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="seqCurrent" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="creator" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="createTime" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="modifier" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="modifyTime" />
          <enable-state-form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="enableState" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="deleted" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="tenantId" />
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
        name: 'BaseBusinessCodeDetail',
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
