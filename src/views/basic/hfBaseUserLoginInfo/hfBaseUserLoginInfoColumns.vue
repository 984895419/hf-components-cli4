<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'userId'"
          prop="userId"
          :label="$t(conf.namespace + '.userId')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'pwd'"
          prop="pwd"
          :label="$t(conf.namespace + '.pwd')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'salt'"
          prop="salt"
          :label="$t(conf.namespace + '.salt')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'lastLoginType'"
          prop="lastLoginType"
          :label="$t(conf.namespace + '.lastLoginType')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'lastLoginTime'"
          prop="lastLoginTime"
          :label="$t(conf.namespace + '.lastLoginTime')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'loginState'"
          prop="loginState"
          :label="$t(conf.namespace + '.loginState')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'noChangePwd'"
          prop="noChangePwd"
          :label="$t(conf.namespace + '.noChangePwd')"
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
        name: 'HfBaseUserLoginInfoColumns',
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
