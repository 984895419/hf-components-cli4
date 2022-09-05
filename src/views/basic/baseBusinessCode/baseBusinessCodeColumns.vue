<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'businessId'"
          prop="businessId"
          :width="item.width || 60"
        :label="$t(conf.namespace + '.businessId')"
        />
        <default-table-column
          v-if="item.value === 'businessKey'"
          prop="businessKey"
          :width="item.width||180"
        :label="$t(conf.namespace + '.businessKey')"
          min-width="180"
          :namespace="conf.namespace"
          :copyable="true"
        />
        <el-table-column
          v-if="item.value === 'businessName'"
          prop="businessName"
          :width="item.width"
        :label="$t(conf.namespace + '.businessName')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'businessDescription'"
          prop="businessDescription"
          :width="item.width"
        :label="$t(conf.namespace + '.businessDescription')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'prefix'"
          prop="prefix"
          :width="item.width||80"
        :label="$t(conf.namespace + '.prefix')"
        />
        <el-table-column
          v-if="item.value === 'suffix'"
          prop="suffix"
          :width="item.width || 80"
        :label="$t(conf.namespace + '.suffix')"
        />
        <el-table-column
          v-if="item.value === 'useDate'"
          prop="useDate"
          :width="item.width"
        :label="$t(conf.namespace + '.useDate')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'dateFormat'"
          prop="dateFormat"
          :width="item.width"
        :label="$t(conf.namespace + '.dateFormat')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'seqStart'"
          prop="seqStart"
          :width="item.width"
        :label="$t(conf.namespace + '.seqStart')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'seqStep'"
          prop="seqStep"
          :width="item.width"
        :label="$t(conf.namespace + '.seqStep')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'seqLength'"
          prop="seqLength"
          :width="item.width"
        :label="$t(conf.namespace + '.seqLength')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'seqCurrent'"
          prop="seqCurrent"
          :width="item.width"
        :label="$t(conf.namespace + '.seqCurrent')"
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
          :width="item.width||130"
        :label="$t(conf.namespace + '.tenantId')"
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
        name: 'BaseBusinessCodeColumns',
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
