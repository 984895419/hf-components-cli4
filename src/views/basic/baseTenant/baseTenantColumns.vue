<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'id'"
        prop="id"
        :width="item.width || 60"
        :label="$t(conf.namespace + '.id')"
      />
      <el-table-column
        v-if="item.value === 'tenantKey'"
        prop="tenantKey"
        :width="item.width"
        :label="$t(conf.namespace + '.tenantKey')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'tenantName'"
        prop="tenantName"
        :width="item.width"
        :label="$t(conf.namespace + '.tenantName')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'tenantDescription'"
        prop="tenantDescription"
        :width="item.width"
        :label="$t(conf.namespace + '.tenantDescription')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'tenantInit'"
        prop="tenantInitName"
        :width="item.width"
        :label="$t(conf.namespace + '.tenantInit')"
        min-width="130"
      />
      <creator-table-column :width="item.width" v-if="item.value === 'creatorUserName'" />
      <create-time-table-column :width="item.width" v-if="item.value === 'createTime'" />
      <modifier-table-column :width="item.width" v-if="item.value === 'modifierUserName'" />
      <modify-time-table-column :width="item.width" v-if="item.value === 'modifyTime'" />
      <enable-state-table-column
        :width="item.width || 150"
        v-if="item.value === 'enableState'"
        :enable-url="urlMethods.enableUrl"
        :disable-url="urlMethods.disableUrl"
        :operate-function="(row) => row.initData + '' !== '1'"
        v-on="$listeners"
      />
      <el-table-column
        v-if="item.value === 'deleted'"
        prop="deleted"
        :width="item.width"
        :label="$t(conf.namespace + '.deleted')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'initData'"
        prop="initDataName"
        :width="item.width"
        :label="$t(conf.namespace + '.initData')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'parentId'"
        prop="parentName"
        :width="item.width"
        :label="$t(conf.namespace + '.parentId')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'level'"
        prop="level"
        :width="item.width"
        :label="$t(conf.namespace + '.level')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'levelStr'"
        prop="levelStr"
        :width="item.width"
        :label="$t(conf.namespace + '.levelStr')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'sort'"
        prop="sort"
        :width="item.width"
        :label="$t(conf.namespace + '.sort')"
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

    export default {
        name: 'BaseTenantColumns',
        components: { EnableStateTableColumn,
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
