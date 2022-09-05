<template>
  <el-table-column
    prop="enableState"
    :label="$t('common.state')"
    v-bind="$attrs"
    :width="width ? width : (operate ? 150 : 55)"
    v-on="$listeners"
  >
    <template slot-scope="scope">
      <div v-if="operate === true || (operateFunction && operateFunction(scope.row))">
        <el-switch
          :size="size"
          v-model="scope.row.enableState"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-text="$t('common.enable')"
          :inactive-text="$t('common.disable')"
          @change="doSwitchState(scope.row)"
        />
      </div>
      <div v-else>
        <el-tag v-if="scope.row.enableState === 1" type="success">{{ $t('common.enable') }}</el-tag>
        <el-tag v-if="scope.row.enableState === 0" type="danger">{{ $t('common.disable') }}</el-tag>
      </div>
    </template>
  </el-table-column>
</template>

<script>
    import { baseApiPutMethod } from '../../baseApi'
    import { mapGetters } from 'vuex'
    import CurdMixin from '@/components/CURD/curd.mixin'
    import { getMessage, isSuccessResult } from '../../../../utils/ajaxResultUtil'

    export default {
        name: 'EnableStateTableColumn',
        mixins: [CurdMixin],
        props: {
            operate: {
                type: Boolean,
                default: false
            },
            enableUrl: {
                type: String,
                default: null
            },
            disableUrl: {
                type: String,
                default: null
            },
            operateFunction: Function,
            width: {
                type: Number
            }
        },
        computed: {
            ...mapGetters([
                'size'
            ])
        },
        methods: {
          doSwitchState(row) {
              let url = this.disableUrl
              if (row.enableState === 1) {
                  url = this.enableUrl
              }
              if (url) {
                  baseApiPutMethod(this.templateUrl(url, row)).then(resp => {
                      if (isSuccessResult(resp)) {
                          this.$emit('success')
                          this.$message.success(getMessage(resp))
                      } else {
                          this.$message.error(getMessage(resp))
                      }
                  })
              } else {
                  throw new Error('没有对应的url')
              }
          }
        }
    }
</script>

<style scoped>

</style>
