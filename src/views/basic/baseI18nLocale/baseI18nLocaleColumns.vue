<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'localeId'"
          prop="localeId"
          :label="$t(conf.namespace + '.localeId')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'locale'"
          prop="locale"
          :label="$t(conf.namespace + '.locale')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'content'"
          prop="content"
          :label="$t(conf.namespace + '.content')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'groupId'"
          prop="groupId"
          :label="$t(conf.namespace + '.groupId')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'groupName'"
          prop="groupName"
          :label="$t(conf.namespace + '.groupName')"
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
        name: 'BaseI18nLocaleColumns',
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
