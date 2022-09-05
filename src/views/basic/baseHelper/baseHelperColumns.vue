<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'helperId'"
          prop="helperId"
          :label="$t(conf.namespace + '.helperId')"
          :width="item.width"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'helperTitle'"
          prop="helperTitle"
          :label="$t(conf.namespace + '.helperTitle')"
          :width="item.width"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'helperContent'"
          prop="helperContent"
          :label="$t(conf.namespace + '.helperContent')"
          :width="item.width"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'helperAuthor'"
          prop="helperAuthor"
          :label="$t(conf.namespace + '.helperAuthor')"
          :width="item.width"
          min-width="130"
        />
        <creator-table-column :width="item.width" v-if="item.value === 'creator'" />
        <create-time-table-column :width="item.width" v-if="item.value === 'createTime'" />
        <modifier-table-column :width="item.width" v-if="item.value === 'modifier'" />
        <modify-time-table-column :width="item.width" v-if="item.value === 'modifyTime'" />
        <enable-state-table-column
          v-if="item.value === 'enableState'"
          :operate="true"
          :width="item.width"
          :enable-url="urlMethods.enableUrl"
          :disable-url="urlMethods.disableUrl"
          v-on="$listeners"
        />
        <el-table-column
          v-if="item.value === 'deleted'"
          prop="deleted"
          :label="$t(conf.namespace + '.deleted')"
          :width="item.width"
          min-width="130"
        />
        <el-table-column
                v-if="item.value === 'menuId'"
                prop="menuIdName"
                :label="$t(conf.namespace + '.menuIdName')"
                :width="item.width"
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
        name: 'BaseHelperColumns',
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
