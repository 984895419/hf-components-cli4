<template>
    <div>
      <div v-if="isDeveloping">
        <el-table-column
          prop="regexKey"
          :label="$t(conf.namespace + '.regexKey')"
          min-width="180"
        >
          <template slot-scope="scopeRow">
            <!-- 开发的时候使用的一键复制 -->
            <el-tooltip placement="left" effect="light">
              <div slot="content">
                <copy-btn :copy-data="copyData" :size="size" :data="scopeRow.row" label="复制Validator"/>
              </div>
              <span>
                <copier-render :copyable="true" :row="scopeRow.row" prop="regexKey"/>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
      </div>
      <default-table-column
        v-else
        prop="regexKey"
        :label="$t(conf.namespace + '.regexKey')"
        min-width="130"
        :namespace="conf.namespace"
        :copyable="true"
      />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import DefaultTableColumn from '@/components/CURD/Table/column/DefaultTableColumn'
    import * as conf from './api'
    import CopierRender from '@/components/CURD/Table/column/other/CopierRender'
    import CopyBtn from '@/components/CURD/developing/CopyBtn'
    export default {
        name: 'DeveloperRegexCopierColumn',
        components: {CopyBtn, CopierRender, DefaultTableColumn },
        data() {
            return {
                conf: conf
            }
        },
        computed: {
            ...mapGetters([
                'isDeveloping',
                'size'
            ])
        },
        methods: {
            copyData(row) {
                return '@CustomRegexRule(value = "' + row.regexKey + '", message = "MODIFY_TIME_MESSAGE_NOT_VALIDATE")'
            }
        }
    }
</script>

<style scoped>

</style>
