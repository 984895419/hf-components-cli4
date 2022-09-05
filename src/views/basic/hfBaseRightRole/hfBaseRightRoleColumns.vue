<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'roleId'"
        prop="roleId"
        :label="$t(conf.namespace + '.roleId')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'roleName'"
        prop="roleName"
        :label="$t(conf.namespace + '.roleName')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'tenantId'"
        prop="tenantName"
        :label="$t(conf.namespace + '.tenantId')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'roleDesc'"
        prop="roleDesc"
        :label="$t(conf.namespace + '.roleDesc')"
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
        name: 'HfBaseRightRoleColumns',
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
