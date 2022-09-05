<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'controllerId'"
          prop="controllerId"
          :label="$t(conf.namespace + '.controllerId')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'value'"
          prop="value"
          :label="$t(conf.namespace + '.value')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'description'"
          prop="description"
          :label="$t(conf.namespace + '.description')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'menu'"
          prop="menu"
          :label="$t(conf.namespace + '.menu')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'menuName'"
          prop="menuName"
          :label="$t(conf.namespace + '.menuName')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'controllerName'"
          prop="controllerName"
          :label="$t(conf.namespace + '.controllerName')"
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
        name: 'BaseHandlerMappingControllerColumns',
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
