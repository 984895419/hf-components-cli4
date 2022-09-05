<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'ruleId'"
          prop="ruleId"
          :width="item.width||60"
        :label="$t(conf.namespace + '.ruleId')"
        />
<!--        <default-table-column-->
<!--          v-if="item.value === 'regexKey'"-->
<!--          prop="regexKey"-->
<!--          :width="item.width"
        :label="$t(conf.namespace + '.regexKey')"-->
<!--          min-width="180"-->
<!--          :namespace="conf.namespace"-->
<!--          :copyable="true"-->
<!--        />-->
        <developer-regex-copier-column
          v-if="item.value === 'regexKey'"
        />
        <default-table-column
          v-if="item.value === 'regexValue'"
          prop="regexValue"
          :width="item.width"
        :label="$t(conf.namespace + '.regexValue')"
          min-width="180"
          :namespace="conf.namespace"
        />
        <el-table-column
          v-if="item.value === 'description'"
          prop="description"
          :width="item.width"
        :label="$t(conf.namespace + '.description')"
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
          :width="item.width"
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
    import DefaultTableColumn from "../../../components/CURD/Table/column/DefaultTableColumn";
    import DeveloperRegexCopierColumn from "./DeveloperRegexCopierColumn";

    export default {
        name: 'BaseRegexRuleColumns',
        components: {
            DeveloperRegexCopierColumn,
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
