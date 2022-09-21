<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in (jsonData.list || value)"
        :key="index"
        :icon="activity.icon"
        :type="activity.type || (index == 0 ? 'success' : 'info')"
        :color="activity.color"
        :size="activity.size || 'large'"
        :timestamp="timeFormat(activity[timestampProps])"
      >
        <slot :data="activity">
          <div v-html="activity[contentProps]" />
        </slot>
      </el-timeline-item>
      <el-timeline-item v-if="more || (jsonData.total > jsonData.list.length)" size="large">
        <template #dot>
          <el-link type="primary" :underline="false" @click="next()"><i class="el-icon-more" /></el-link>
        </template>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
  import { parseTime } from '@/utils'
  import { baseApiGetMethod } from '@/components/CURD/baseApi'
  import { isSuccessResult } from '@/utils/ajaxResultUtil'
import { id } from 'vue-json-editor/assets/jsoneditor'
  export default {
    name: 'HfTimeline',
    props: {
      /**
       * 数组
       */
      value: {
        type: Array,
        default: () => []
      },
      /**
       * 时间的属性
       */
      timestampProps: {
        type: String,
        default: 'timestamp'
      },
      /**
       * 内容的属性
       */
      contentProps: {
        type: String,
        default: 'content'
      },
      /**
       * 格式化
       */
      timeFormat: {
        type: Function,
        default: (val) => {
          return parseTime(val, '{y}-{m}-{d} {h}:{i}')
        }
      },
      more: {
        type: Boolean,
        default: false
      },
      /**
       * 查询地址
       */
      queryUrl: {
        type: String
      },
      /**
       * 查询条件的数据
       */
      searchData: {
        type: Object,
        default: () => ({})
      },
      sortInfo: {
        type: Array,
        default: () => [
          { fieldName: 'id', value: 1 }
        ]
      }
    },
    data() {
      return {

        /**
         * 查询的表单信息
         */
         searchForm: {
            /**
             * 分页信息
             */
            pageInfo: {
                pageNo: 1,
                pageSize: this.$store.getters.pageSize
            },
            /**
             * 排序信息
             */
            sortInfo: this.sortInfo
        },
        jsonData: {
          list: [],
          total: 0
        }
      }
    },
    created() {
      if (this.queryUrl) {
        this.doSearch()
      }
    },
    methods: {
      /**
       * 执行查询操作
       */
       doSearch(searchForm = Object.assign({}, this.searchData, this.searchForm)) {
          if (this.queryUrl) {
              this.loading = true
              baseApiGetMethod(this.queryUrl, searchForm).then(resp => {
                  if (isSuccessResult(resp)) {
                    this.searchForm.pageInfo.pageNo = this.searchForm.pageInfo.pageNo + 1
                    if (resp.data.list) {
                      this.jsonData.list = this.jsonData.list.concat(resp.data.list)
                    }
                    this.jsonData.total = resp.data.total
                  } else {
                      this.$message.error(resp.message)
                  }
                  this.loading = false
              }).catch(e => {
                  console.log(e)
                  this.loading = false
              })
          } else {
              this.$message.error('请配置分页查询地址参数:{pageUrl: xxxx}')
          }
      },
      /**
       * 下一个
       */
      next() {
        if (this.queryUrl) {
          this.doSearch(Object.assign({}, this.searchData, this.searchForm, {
            pageInfo: {
              pageNo: this.searchForm.pageInfo.pageNo + 1,
              pageSize: this.searchForm.pageInfo.pageSize
            }
          }))
        } else {
          this.$emit('more')
        }
      }
    }
  }
</script>
