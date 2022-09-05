<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'id'"
        prop="id"
        :label="$t(conf.namespace + '.id')"
        min-width="40"
      />
      <el-table-column
        v-if="item.value === 'userId'"
        prop="creatorUserName"
        :label="$t(conf.namespace + '.userId')"
        width="80"
      />
      <el-table-column
        v-if="item.value === 'loginType'"
        prop="loginTypeName"
        :label="$t(conf.namespace + '.loginType')"
        width="120"
      />
      <el-table-column
        v-if="item.value === 'loginTime'"
        prop="loginTime"
        :label="$t(conf.namespace + '.loginTime')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'lastLoginIp'"
        prop="lastLoginIp"
        :label="$t(conf.namespace + '.lastLoginIp')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'lastLoginFinger'"
        prop="lastLoginFinger"
        :label="$t(conf.namespace + '.lastLoginFinger')"
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
        name: 'HfBaseUserLoginLogColumns',
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
