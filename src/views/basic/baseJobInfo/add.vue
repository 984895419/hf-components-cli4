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
                :error="errorMessage('jobName')"
                :span="span"
                prop="jobName"
                :namespace="conf.namespace"
               />
               <form-item-col-text-area
                :value="data"
                :error="errorMessage('jobDescription')"
                :span="span"
                prop="jobDescription"
                :namespace="conf.namespace"
               />
              <form-item-col-dict
                :value="data"
                :error="errorMessage('triggerType')"
                :span="span"
                prop="triggerType"
                :dict-code="'JOB_TRIGGER_TYPE'"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('triggerTime')"
                :span="span"
                prop="triggerTime"
                :namespace="conf.namespace"
              />
              <form-item-col-enable-state
                :value="data"
                :span="span"
                :namespace="conf.namespace"
              />
               <form-item-col
                :value="data"
                :error="errorMessage('jobTypeId')"
                :span="span"
                prop="jobTypeId"
                :namespace="conf.namespace"
               >
                 <base-job-type-input-refer :value="data" value-refer-id="jobTypeId" value-refer-name="jobTypeName"/>
               </form-item-col>
              <form-item-col
                :value="data"
                v-if="data.jobTypeId"
                :error="errorMessage('jobData')"
                :span="span"
                prop="jobData"
                :namespace="conf.namespace"
              >
                <job-type-render :value="data" field="jobData" :job-type-id="data.jobTypeId"/>
              </form-item-col>
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
    import BaseJobTypeInputRefer from "../baseJobType/inputRefer"
    import FormItemColTextArea from '@/components/CURD/Form/formItemColTextarea'
    import JobTypeRender from '../baseJobType/JobTypeRender'
    export default {
        name: 'BaseJobInfoAdd',
        components: {
            JobTypeRender,
            FormItemColTextArea,
            BaseJobTypeInputRefer, FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn, FormItemColEnableState },
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
