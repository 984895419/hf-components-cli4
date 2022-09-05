<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'jobId'"
          prop="jobId"
          :width="item.width"
        :label="$t(conf.namespace + '.jobId')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'jobName'"
          prop="jobName"
          :width="item.width"
        :label="$t(conf.namespace + '.jobName')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'jobDescription'"
          prop="jobDescription"
          :width="item.width"
        :label="$t(conf.namespace + '.jobDescription')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'jobData'"
          prop="jobData"
          :width="item.width"
        :label="$t(conf.namespace + '.jobData')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'jobTypeId'"
          prop="jobTypeId"
          :width="item.width"
        :label="$t(conf.namespace + '.jobTypeId')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'jobTypeName'"
          prop="jobTypeName"
          :width="item.width"
        :label="$t(conf.namespace + '.jobTypeName')"
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
        <el-table-column
          v-if="item.value === 'tenantId'"
          prop="tenantId"
          :width="item.width"
        :label="$t(conf.namespace + '.tenantId')"
          min-width="130"
        />
        <tag-table-column
          v-if="item.value === 'runState'"
          prop="runStateName"
          :width="item.width"
        :label="$t(conf.namespace + '.runState')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'finishTime'"
          prop="finishTime"
          :width="item.width"
        :label="$t(conf.namespace + '.finishTime')"
          min-width="130"
        />

      <el-table-column
        v-if="item.value === 'triggerType'"
        prop="triggerType"
        :width="item.width"
        :label="$t(conf.namespace + '.triggerType')"
        min-width="130"
      />

      <el-table-column
        v-if="item.value === 'triggerTime'"
        prop="triggerTime"
        :width="item.width"
        :label="$t(conf.namespace + '.triggerTime')"
        min-width="130"
      />

      <el-table-column
        v-if="item.value === 'startTime'"
        prop="startTime"
        :width="item.width"
        :label="$t(conf.namespace + '.startTime')"
        min-width="100"
      />
      <el-table-column
        v-if="item.value === 'endTime'"
        prop="endTime"
        :width="item.width"
        :label="$t(conf.namespace + '.endTime')"
        min-width="100"
      />
      <el-table-column
        v-if="item.value === 'nextFireTime'"
        prop="nextFireTime"
        :width="item.width"
        :label="$t(conf.namespace + '.nextFireTime')"
        min-width="100"
      />
      <el-table-column
        v-if="item.value === 'previousFireTime'"
        prop="previousFireTime"
        :width="item.width"
        :label="$t(conf.namespace + '.previousFireTime')"
        min-width="100"
      />
      <tag-table-column
        v-if="item.value === 'executeState'"
        prop="executeStateName"
        :width="item.width"
        :label="$t(conf.namespace + '.executeState')"
        min-width="100"
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
    import TagTableColumn from "../../../components/CURD/Table/column/base/TagTableColumn";

    export default {
        name: 'BaseJobInfoColumns',
        components: {
            TagTableColumn, EnableStateTableColumn,
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
