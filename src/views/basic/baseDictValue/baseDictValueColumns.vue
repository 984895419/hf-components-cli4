<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'valueId'"
          prop="valueId"
          :label="$t(conf.namespace + '.valueId')"
          width="60"
        />
        <el-table-column
          v-if="item.value === 'typeCode'"
          prop="typeCode"
          :label="$t(conf.namespace + '.typeCode')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'name'"
          prop="name"
          :label="$t(conf.namespace + '.name')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'dictKey'"
          prop="dictKey"
          :label="$t(conf.namespace + '.dictKey')"
          min-width="130"
        />
        <default-table-column
          v-if="item.value === 'dictValue'"
          prop="dictValue"
          :label="$t(conf.namespace + '.dictValue')"
          min-width="130"
          :namespace="conf.namespace"
          :copyable="true"
        />
        <enable-state-table-column
          v-if="item.value === 'enableState'"
          :operate="true"
          :enable-url="urlMethods.enableUrl"
          :disable-url="urlMethods.disableUrl"
          v-on="$listeners"
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
    import DefaultTableColumn from "../../../components/CURD/Table/column/DefaultTableColumn";

    export default {
        name: 'BaseDictValueColumns',
        components: {
            DefaultTableColumn, EnableStateTableColumn,
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
