<template>
  <div>
    <form-item-text
      :value="value"
      :span="12"
      prop="tableName"
      :namespace="conf.namespace">
      {{value.name}}
    </form-item-text>
    <form-item-text
      :value="value"
      :span="12"
      prop="tableComment"
      :namespace="conf.namespace">
      {{value.comment}}
    </form-item-text>
    <form-item-text
      :value="value"
      :span="12"
      prop="author"
      :namespace="conf.namespace">
    </form-item-text>
    <form-item-text
      :value="value"
      :span="12"
      prop="havePrimaryKey"
      :namespace="conf.namespace">
      <span v-if="value.havePrimaryKey === true">
        是
      </span>
      <span v-else>否</span>
    </form-item-text>
    <form-item-col
      :value="value"
      :span="12"
      prop="moduleName"
      :namespace="conf.namespace">
    </form-item-col>
    <form-item-col
      :value="value"
      :span="12"
      prop="packageName"
      :namespace="conf.namespace">
    </form-item-col>
    <form-item-col
      :value="value"
      :span="12"
      prop="vuePath"
      :namespace="conf.namespace">
    </form-item-col>
    <form-item-col
      :value="value"
      :span="12"
      prop="javaPath"
      :namespace="conf.namespace">
    </form-item-col>
  </div>
</template>

<script>
import * as conf from './api'
import FormItemCol from '../../../components/CURD/Form/formItemCol'
import FormItemText from '../../../components/CURD/Form/formItemText'
export default {
    name: 'FirstSetting',
    components: { FormItemText, FormItemCol },
    props: {
        value: {
            type: Object
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
