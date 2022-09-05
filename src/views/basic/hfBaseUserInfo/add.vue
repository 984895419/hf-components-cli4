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
                :error="errorMessage('userCode')"
                :span="span"
                prop="userCode"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('userName')"
                :span="span"
                prop="userName"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('pkOrg')"
                :span="span"
                prop="pkOrg"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('pkDept')"
                :span="span"
                prop="pkDept"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('gender')"
                :span="span"
                prop="gender"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('mobile')"
                :span="span"
                prop="mobile"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('email')"
                :span="span"
                prop="email"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('ncUserId')"
                :span="span"
                prop="ncUserId"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('userFrom')"
                :span="span"
                prop="userFrom"
                :namespace="conf.namespace"
              />
              <form-item-col-enable-state
                :value="data"
                :span="span"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('headPic')"
                :span="span"
                prop="headPic"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('id')"
                :span="span"
                prop="id"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('effectTime')"
                :span="span"
                prop="effectTime"
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
        name: 'HfBaseUserInfoAdd',
        components: { FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn, FormItemColEnableState },
        props: {
            value: {
                type: Object,
                default: function() {
                    return { enableState: 1 }
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
