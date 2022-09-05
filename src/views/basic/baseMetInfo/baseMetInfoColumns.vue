<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'metId'"
          prop="metId"
          :label="$t(conf.namespace + '.metId')"
          :width="item.width"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'metTitle'"
          prop="metTitle"
          :label="$t(conf.namespace + '.metTitle')"
          :width="item.width"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'metContent'"
          prop="metContent"
          :label="$t(conf.namespace + '.metContent')"
          :width="item.width"
          min-width="130"
        />
<!--        <el-table-column-->
<!--          v-if="item.value === 'metTime'"-->
<!--          prop="metTime"-->
<!--          :label="$t(conf.namespace + '.metTime')"-->
<!--          :width="item.width"-->
<!--          min-width="130"-->
<!--        />-->
        <date-time-format-table-column
          format-str="{y}-{m}-{d} {h}:{i}"
          v-if="item.value === 'metTime'"
          prop="metTime"
          :label="$t(conf.namespace + '.metTime')"
          :width="item.width"
          min-width="130"/>
        <creator-table-column :width="item.width" v-if="item.value === 'creator'" />
        <create-time-table-column :width="item.width" v-if="item.value === 'createTime'" />
        <modifier-table-column :width="item.width" v-if="item.value === 'modifier'" />
        <modify-time-table-column :width="item.width" v-if="item.value === 'modifyTime'" />
        <el-table-column
          v-if="item.value === 'deleted'"
          prop="deleted"
          :label="$t(conf.namespace + '.deleted')"
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
    import DateTimeFormatTableColumn from "../../../components/CURD/Table/column/base/DateTimeFormatTableColumn";

    export default {
        name: 'BaseMetInfoColumns',
        components: {
            DateTimeFormatTableColumn, EnableStateTableColumn,
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
