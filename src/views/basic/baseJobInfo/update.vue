<template>
  <div>
    <update-btn btn-type="text" :url="templateUrl(queryUrl, value)">
      <template v-slot="{ closeDialog, data }">
        <cu-form :form-rules="formRules" :value="data" :action-method="updateMethod"  @success="actionSuccess" @closeDialog="closeDialog">
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
                  <base-job-type-job-type-id-slot :job-type-ids="[data.jobTypeId]">
                    <template v-slot="scopeRow">
                      <div v-if="scopeRow.data && scopeRow.data.length > 0">
                        <component v-model="data.jobData" v-if="scopeRow.data[0].jobComponentPath && !scopeRow.data[0].jobComponentPath.startsWith('http')" :is="scopeRow.data[0].jobComponentPath"></component>
                      </div>
                      <div v-else>不支持的类型</div>
                    </template>
                  </base-job-type-job-type-id-slot>
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
    </update-btn>
  </div>
</template>

<script>
    import * as conf from './api'
    import UpdateBtn from '@/components/CURD/Btns/UpdateBtn'
    import CuForm from '@/components/CURD/Form/cuFrom'
    import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
    import FormItemCol from '@/components/CURD/Form/formItemCol'
    import CurdMixin from '@/components/CURD/curd.mixin'
    import { baseApiPutMethod } from '@/components/CURD/baseApi'
    import FormItemColDict from '@/components/CURD/Form/formItemColDict'
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    import FormItemColTextArea from "../../../components/CURD/Form/formItemColTextarea";
    import BaseJobTypeJobTypeIdSlot from "../baseJobType/baseJobTypeApiSlot";
    export default {
        name: 'BaseJobInfoUpdate',
        components: {
            BaseJobTypeJobTypeIdSlot,
            FormItemColTextArea, FormItemColDict, FormItemCol, RowSpanSlot, CuForm, UpdateBtn, FormItemColEnableState },
        mixins: [CurdMixin],
        props: {
            value: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            queryUrl: String,
            updateUrl: String
        },
        data() {
            return {
                conf: conf,
                formRules: null
            }
        },
        computed: {
            updateMethod() {
                return (data) => {
                    return baseApiPutMethod(this.templateUrl(this.updateUrl, data), data)
                }
            }
        },
        created() {
            this.formRules = conf.formRules(this)
        },
        methods: {
            actionSuccess() {
                this.$emit('success')
            }
        }
    }
</script>

<style scoped>

</style>
