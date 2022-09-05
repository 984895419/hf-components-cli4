<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'pkCorp'"
        prop="pkCorp"
        :label="$t(conf.namespace + '.pkCorp')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'name'"
        prop="name"
        :label="$t(conf.namespace + '.name')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'pkFatherorg'"
        prop="pkFatherorg"
        :label="$t(conf.namespace + '.pkFatherorg')"
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
        v-if="item.value === 'parentId'"
        prop="parentId"
        :label="$t(conf.namespace + '.parentId')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'level'"
        prop="level"
        :label="$t(conf.namespace + '.level')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'levelStr'"
        prop="levelStr"
        :label="$t(conf.namespace + '.levelStr')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'sort'"
        prop="sort"
        :label="$t(conf.namespace + '.sort')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'deleted'"
        prop="deleted"
        :label="$t(conf.namespace + '.deleted')"
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
        name: 'HfBaseCompanyInfoColumns',
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
