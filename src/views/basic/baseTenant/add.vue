<template>
  <add-btn :init-data="value">
    <template v-slot="{ closeDialog, data }">
      <cu-form :namespace="conf.namespace" :value="data" :action-method="addUrl" :form-rules="formRules" v-on="$listeners" @closeDialog="closeDialog">
        <template v-slot="{ errorMessage }">
          <row-span-slot>
            <template v-slot="{ span }">
              <!-- 新增的的字段配置 -->
                             <form-item-col
                :value="data"
                :error="errorMessage('tenantKey')"
                :span="span"
                prop="tenantKey"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('tenantName')"
                :span="span"
                prop="tenantName"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('tenantDescription')"
                :span="span"
                prop="tenantDescription"
                :namespace="conf.namespace"
               />
<!--              <form-item-col-dict-->
<!--                :value="data"-->
<!--                :error="errorMessage('tenantInit')"-->
<!--                :span="span"-->
<!--                prop="tenantInit"-->
<!--                :dict-code="'YES_OR_NO'"-->
<!--                :namespace="conf.namespace"-->
<!--              />-->
              <form-item-col-enable-state
                :value="data"
                :span="span"
                :namespace="conf.namespace"
              />
              <form-item-col-dict
                :value="data"
                :error="errorMessage('initData')"
                :span="span"
                prop="initData"
                :dict-code="'YES_OR_NO'"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('parentId')"
                :span="span"
                prop="parentId"
                :namespace="conf.namespace"
              >
                <base-tenant-input-refer :value="data" value-refer-id="parentId" value-refer-name="parentName"/>
              </form-item-col>
               <form-item-col
                :value="data"
                :error="errorMessage('sort')"
                :span="span"
                prop="sort"
                :namespace="conf.namespace"
               />
              <!-- 字典字段字段设置方法如下
              <form-item-col-dict
                :value="data"
                :error="errorMessage('clientMethod')"
                :span="span"
                prop="clientMethod"
                :dict-code="'CLIENT_METHOD_TYPES'"
                :namespace="conf.namespace"
              /> -->
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
    import BaseTenantInputRefer from "./inputRefer";
    export default {
        name: 'BaseTenantAdd',
        components: {BaseTenantInputRefer, FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn, FormItemColEnableState },
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
