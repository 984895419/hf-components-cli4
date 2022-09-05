<template>
  <common-dialog-btn :label="$t('common.look')" type="text">
    <el-form ref="form" :model="value" label-width="auto">
      <row-span-slot>
        <template v-slot="{ span }">
                    <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="reqId" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="requestUrl" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="requestMethod" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="requestIp" />
          <form-item-text :span="24" :namespace="conf.namespace" :value="value" prop="requestHeaders">
            <json-views v-if="isJsonResult(value.requestHeaders)" copyable :expand-depth="0" :data="JSON.parse(value.requestHeaders)"/>
            <div v-else>{{value.requestHeaders}}</div>
          </form-item-text>
          <form-item-text :span="24" :namespace="conf.namespace" :value="value" prop="requestParams">
            <json-views v-if="isJsonResult(value.requestParams)" copyable :expand-depth="0" :data="JSON.parse(value.requestParams)"/>
            <div v-else>{{value.requestParams}}</div>
          </form-item-text>
          <form-item-text :span="24" :namespace="conf.namespace" :value="value" prop="requestBody" >
            <json-views v-if="isJsonResult(value.requestBody)" copyable :expand-depth="0" :data="JSON.parse(value.requestBody)"/>
            <div v-else>{{value.requestBody}}</div>
          </form-item-text>
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="responseStatus" />
          <form-item-text :span="24" :namespace="conf.namespace" :value="value" prop="responseHeaders">
            <json-views v-if="isJsonResult(value.responseHeaders)" copyable :expand-depth="0" :data="JSON.parse(value.responseHeaders)"/>
            <div v-else>{{value.responseHeaders}}</div>
          </form-item-text>
          <form-item-text :span="24" :namespace="conf.namespace" :value="value" prop="responseBody" >
            <json-views v-if="isJsonResult(value.responseBody)" copyable :expand-depth="0" :data="JSON.parse(value.responseBody)"/>
            <div v-else>{{value.responseBody}}</div>
          </form-item-text>
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="creator" />
          <form-item-text :span="span" :namespace="conf.namespace" :value="value" prop="createTime" />
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
    import JsonViews from 'vue-json-views'
    export default {
        name: 'BaseLogDetail',
        components: { RowSpanSlot, EnableStateFormItemText, FormItemText, CommonDialogBtn, JsonViews },
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
        },
        computed: {
            isJsonResult() {
                return (data) => {
                    return data && (data.startsWith('{') || data.startsWith('['))
                }
            }
        }
    }
</script>

<style scoped>

</style>
