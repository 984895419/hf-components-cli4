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
                :error="errorMessage('pwd')"
                :span="span"
                prop="pwd"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('salt')"
                :span="span"
                prop="salt"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('lastLoginType')"
                :span="span"
                prop="lastLoginType"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('lastLoginTime')"
                :span="span"
                prop="lastLoginTime"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('loginState')"
                :span="span"
                prop="loginState"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('noChangePwd')"
                :span="span"
                prop="noChangePwd"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('lastLoginIp')"
                :span="span"
                prop="lastLoginIp"
                :namespace="conf.namespace"
               />
               <form-item-col
                :value="data"
                :error="errorMessage('lastLoginFinger')"
                :span="span"
                prop="lastLoginFinger"
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
    export default {
        name: 'HfBaseUserLoginInfoAdd',
        components: { FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn, FormItemColEnableState },
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
