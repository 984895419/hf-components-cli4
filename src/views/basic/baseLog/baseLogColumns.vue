<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'reqId'"
          prop="reqId"
          :label="$t(conf.namespace + '.reqId')"
          width="80"
        />
        <el-table-column
          v-if="item.value === 'requestUrl'"
          prop="requestUrl"
          :label="$t(conf.namespace + '.requestUrl')"
          min-width="180"
        />
        <el-table-column
          v-if="item.value === 'requestMethod'"
          prop="requestMethod"
          :label="$t(conf.namespace + '.requestMethod')"
          min-width="80"
        />
        <el-table-column
          v-if="item.value === 'requestIp'"
          prop="requestIp"
          :label="$t(conf.namespace + '.requestIp')"
          min-width="130"
        />
      <default-table-column
        min-width="200"
        :copyable="true"
        v-if="item.value === 'responseHeaders'"
        prop="responseHeaders"
        :namespace="conf.namespace"/>
      <default-table-column
        min-width="200"
        :copyable="true"
        v-if="item.value === 'requestHeaders'"
        prop="requestHeaders"
        :namespace="conf.namespace"/>
        <default-table-column
          min-width="200"
          :copyable="true"
          v-if="item.value === 'requestParams'"
          prop="requestParams"
          :namespace="conf.namespace"/>
        <default-table-column
          min-width="200"
          :copyable="true"
          v-if="item.value === 'requestBody'"
          prop="requestBody"
          :namespace="conf.namespace"/>
        <default-table-column
          min-width="200"
          :copyable="true"
          v-if="item.value === 'responseBody'"
          prop="responseBody"
          :namespace="conf.namespace"/>
        <el-table-column
          v-if="item.value === 'responseStatus'"
          prop="responseStatus"
          :label="$t(conf.namespace + '.responseStatus')"
          min-width="130"
        />
        <creator-table-column :width="item.width" v-if="item.value === 'creatorUserName'" />
        <create-time-table-column :width="item.width" v-if="item.value === 'createTime'" />
    </div>
  </div>
</template>

<script>

    import * as conf from './api'
    import EnableStateTableColumn from '@/components/CURD/Table/column/EnableStateTableColumn'
    import CreatorTableColumn from '@/components/CURD/Table/column/CreatorTableColumn'
    import CreateTimeTableColumn from '@/components/CURD/Table/column/CreateTimeTableColumn'
    import ModifierTableColumn from '@/components/CURD/Table/column/ModifierTableColumn'
    import ModifyTimeTableColumn from '@/components/CURD/Table/column/ModifyTimeTableColumn'
    import DefaultTableColumn from '@/components/CURD/Table/column/DefaultTableColumn'

    export default {
        name: 'BaseLogColumns',
        components: {
            DefaultTableColumn, EnableStateTableColumn,
            CreatorTableColumn, CreateTimeTableColumn,
            ModifierTableColumn, ModifyTimeTableColumn },
        props: {
            urlMethods: {
                type: Object
            },
            showFields: Array
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
