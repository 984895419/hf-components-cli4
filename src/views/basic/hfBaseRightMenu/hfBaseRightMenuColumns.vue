<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'menuId'"
        prop="menuId"
        :label="$t(conf.namespace + '.menuId')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'menuAlias'"
        prop="menuAlias"
        :label="$t(conf.namespace + '.menuAlias')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'menuName'"
        prop="menuName"
        :label="$t(conf.namespace + '.menuName')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'menuType'"
        prop="menuTypeName"
        :label="$t(conf.namespace + '.menuType')"
        width="100"
      />
      <el-table-column
        v-if="item.value === 'i18nMenuName'"
        prop="i18nMenuName"
        :label="$t(conf.namespace + '.i18nMenuName')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'controllerId'"
        prop="controllerId"
        :label="$t(conf.namespace + '.controllerId')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'icon'"
        prop="icon"
        :label="$t(conf.namespace + '.icon')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'redirect'"
        prop="redirect"
        :label="$t(conf.namespace + '.redirect')"
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
        prop="parentName"
        :label="$t(conf.namespace + '.parentId')"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'level'"
        prop="level"
        :label="$t(conf.namespace + '.level')"
        min-width="60"
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
        v-if="item.value === 'component'"
        prop="component"
        :label="$t(conf.namespace + '.component')"
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
        name: 'HfBaseRightMenuColumns',
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
