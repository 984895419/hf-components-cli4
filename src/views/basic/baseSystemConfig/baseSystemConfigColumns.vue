<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'configId'"
        prop="configId"
        :width="item.width||80"
        :label="$t(conf.namespace + '.configId')"
      />
      <default-table-column
        v-if="item.value === 'configKey'"
        prop="configKey"
        :width="item.width||200"
        :label="$t(conf.namespace + '.configKey')"
        :namespace="conf.namespace"
        :copyable="true"
      />
      <el-table-column
        v-if="item.value === 'configValue'"
        prop="configValue"
        :width="item.width||130"
        :label="$t(conf.namespace + '.configValue')"
      />
      <el-table-column
        v-if="item.value === 'configDescription'"
        prop="configDescription"
        :width="item.width"
        :label="$t(conf.namespace + '.configDescription')"
        min-width="130"
      />
      <creator-table-column :width="item.width" v-if="item.value === 'creatorUserName'" />
      <create-time-table-column :width="item.width" v-if="item.value === 'createTime'" />
      <modifier-table-column :width="item.width" v-if="item.value === 'modifierUserName'" />
      <modify-time-table-column :width="item.width" v-if="item.value === 'modifyTime'" />
      <enable-state-table-column
        v-if="item.value === 'enableState'"
        :operate="true"
        :enable-url="urlMethods.enableUrl"
        :disable-url="urlMethods.disableUrl"
        v-on="$listeners"
      />
      <el-table-column
        v-if="item.value === 'deleted'"
        prop="deleted"
        :width="item.width||100"
        :label="$t(conf.namespace + '.deleted')"
      />
      <el-table-column
        v-if="item.value === 'initData'"
        prop="initDataName"
        :width="item.width"
        :label="$t(conf.namespace + '.initData')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'tenantId'"
        prop="tenantId"
        :width="item.width"
        :label="$t(conf.namespace + '.tenantId')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'terminal'"
        prop="terminalName"
        :width="item.width"
        :label="$t(conf.namespace + '.terminal')"
        min-width="130"
      />
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
    import DefaultTableColumn from '../../../components/CURD/Table/column/DefaultTableColumn'

    export default {
        name: 'BaseSystemConfigColumns',
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
