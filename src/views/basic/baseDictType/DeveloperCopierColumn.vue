<template>
    <div>
      <div v-if="isDeveloping">
        <el-table-column
          prop="code"
          :label="$t(conf.namespace + '.code')"
          min-width="130"
        >
          <template slot-scope="scopeRow">
            <!-- 开发的时候使用的一键复制 -->
            <el-tooltip placement="left" effect="light">
              <div slot="content">
                <copy-form-item-dict
                  :label="$t('common.searchUsed')"
                                     :value="scopeRow.row.code"
                  :size="size"/><br/>
                <copy-form-item-dict
                  :label="$t('common.formUsed')"
                  :value="scopeRow.row.code"
                  :form-used="1"
                :size="size"/>
              </div>
              <span>
                <copier-render :copyable="true" :row="scopeRow.row" prop="code"/>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
      </div>
      <default-table-column
        v-else
        prop="code"
        :label="$t(conf.namespace + '.code')"
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
    import CopyFormItemDict from '@/components/CURD/developing/CopyFormItemDict';
    import CopierRender from "../../../components/CURD/Table/column/other/CopierRender";
    export default {
        name: 'DeveloperCopierColumn',
        components: {CopierRender, CopyFormItemDict, DefaultTableColumn},
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
        }
    }
</script>

<style scoped>

</style>
