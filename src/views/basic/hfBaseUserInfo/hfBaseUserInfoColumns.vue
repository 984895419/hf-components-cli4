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
        v-if="item.value === 'userCode'"
        prop="userCode"
        :label="$t(conf.namespace + '.userCode')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'userName'"
        prop="userName"
        :label="$t(conf.namespace + '.userName')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'pkOrg'"
        prop="pkOrgName"
        :label="$t(conf.namespace + '.pkOrg')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'pkDept'"
        prop="pkDeptName"
        :label="$t(conf.namespace + '.pkDept')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'gender'"
        prop="gender"
        :label="$t(conf.namespace + '.gender')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'mobile'"
        prop="mobile"
        :label="$t(conf.namespace + '.mobile')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'email'"
        prop="email"
        :label="$t(conf.namespace + '.email')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'ncUserId'"
        prop="ncUserId"
        :label="$t(conf.namespace + '.ncUserId')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'userFrom'"
        prop="userFrom"
        :label="$t(conf.namespace + '.userFrom')"
        min-width="130"
      />
      <creator-table-column :width="item.width" v-if="item.value === 'creatorUserName'" />
      <create-time-table-column :width="item.width" v-if="item.value === 'createTime'" />
      <modifier-table-column :width="item.width" v-if="item.value === 'modifierUserName'" />
      <modify-time-table-column :width="item.width" v-if="item.value === 'modifyTime'" />
      <enable-state-table-column
        v-if="item.value === 'enableState'"
        :operate="false"
        :enable-url="urlMethods.enableUrl"
        :disable-url="urlMethods.disableUrl"
        v-on="$listeners"
      />
      <el-table-column
        v-if="item.value === 'deleted'"
        prop="deleted"
        :label="$t(conf.namespace + '.deleted')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'headPic'"
        prop="headPic"
        :label="$t(conf.namespace + '.headPic')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'id'"
        prop="id"
        :label="$t(conf.namespace + '.id')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'effectTime'"
        prop="effectTime"
        :label="$t(conf.namespace + '.effectTime')"
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
        name: 'HfBaseUserInfoColumns',
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
