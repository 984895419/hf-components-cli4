<template>
  <add-btn :init-data="value">
    <template v-slot="{ closeDialog, data }">
      <cu-form :value="data" :action-method="addUrl" :form-rules="formRules" v-on="$listeners" @closeDialog="closeDialog">
        <template v-slot="{ errorMessage }">
          <row-span-slot>
            <template v-slot="{ span }">
              <!-- 新增的的字段配置 -->
                             <form-item-col
                :value="data"
                :error="errorMessage('helperTitle')"
                :span="span"
                prop="helperTitle"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('helperContent')"
                :span="span"
                prop="helperContent"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('helperAuthor')"
                :span="span"
                prop="helperAuthor"
                :namespace="conf.namespace"
               />
              <form-item-col-enable-state
                :value="data"
                :span="span"
                :namespace="conf.namespace"
              />
               <form-item-col
                 :value="data"
                 :error="errorMessage('menuIdName')"
                 :span="span"
                 prop="menuIdName"
                 :namespace="conf.namespace" >
                 <hf-base-right-menu-input-refer
                   :value="data"
                   :menu-type="'ENDING_MENU'"
                   value-refer-id="menuId"
                   value-refer-name="menuIdName"/>
               </form-item-col>
            </template>
          </row-span-slot>
        </template>
      </cu-form>
    </template>
  </add-btn>
</template>

<script>
    import * as conf from './api'
    import AddBtn from '@/components/CURD/Btns/AddBtn'
    import CuForm from '@/components/CURD/Form/cuFrom'
    import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
    import FormItemCol from '@/components/CURD/Form/formItemCol'
    import FormItemColDict from '@/components/CURD/Form/formItemColDict'
    import { baseApiPostMethod } from '@/components/CURD/baseApi'
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    import HfBaseRightMenuInputRefer from '@/views/basic/hfBaseRightMenu/inputRefer'
    export default {
        name: 'BaseHelperAdd',
        components: {
        HfBaseRightMenuInputRefer,
        FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn, FormItemColEnableState },
        props: {
            value: {
                type: Object,
                default: function() {
                    return { enableState: 1}
                }
            },
            actionUrl: String
        },
        data() {
            return {
                conf: conf,
                formRules: null
            }
        },
        computed: {
            addUrl() {
              return (data) => {
                  return baseApiPostMethod(this.actionUrl, data)
              }
            }
        },
        created() {
          this.formRules = conf.formRules(this)
        }
    }
</script>

<style scoped>

</style>
