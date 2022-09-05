<template>
  <common-dialog-btn :label="$t('common.look')" type="text">
    <el-form ref="form" :model="value">
      <row-span-slot>
        <template v-slot="{ span }">
                    <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="valueId" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="typeCode" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="name" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="dictKey" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="dictValue" />
          <enable-state-form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="enableState" />
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
        name: 'BaseDictValueDetail',
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
