<template>
  <div>
    <el-input
      v-model="value[valueReferName]"
      v-bind="$attrs"
      @focus="openDialog"
      v-on="$listeners"
    />
    <el-dialog
      :visible.sync="showDialog"
      width="75%"
      append-to-body
      v-bind="Object.assign({ 'close-on-click-modal': false}, $attrs)"
    >
      <div style="margin-top: 10px">
        <!-- 查询框 -->
        <div>
          <simple-search v-model="searchForm" :inline="true" @search="doSearch">
            <template v-slot="{ span }">
              <!-- 新增的的字段配置 -->
                            <form-item-col
                :value="searchForm"
                :span="span"
                prop="name"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="searchForm"
                :span="span"
                prop="pkFatherorg"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="searchForm"
                :span="span"
                prop="enableState"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="searchForm"
                :span="span"
                prop="parentId"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="searchForm"
                :span="span"
                prop="sort"
                :namespace="conf.namespace"
              />
              <!-- 字典字段字段设置方法如下
              <form-item-col-dict
                :value="data"
                :error="errorMessage('clientMethod')"
                :span="span"
                prop="clientMethod"
                :dict-code="'CLIENT_METHOD_TYPES'"
                :namespace="conf.namespace"
              /> -->
            </template>
          </simple-search>
        </div>
        <!-- 列表-->
        <hf-table
          v-loading="loading"
          :table-data="jsonData.list"
          @row-dblclick="rowDbClick"
        >
          <!-- 显示的字段-->
          <hf-base-company-info-columns
            :show-fields="conf.default"
            :url-methods="conf.urlMethods"
            @success="doSearch"
          />
        </hf-table>
        <!-- 分页信息 -->
        <curd-pagination
          :current-page.sync="searchForm.pageInfo.pageNo"
          :page-size.sync="searchForm.pageInfo.pageSize"
          :total="jsonData.total"
          @size-change="doSearch"
          @current-change="doSearch"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import * as conf from './api'
    import { baseApiGetMethod } from '@/components/CURD/baseApi'
    import { isSuccessResult } from '@/utils/ajaxResultUtil'
    import { getData, getMessage } from '@/utils/ajaxResultUtil'
    import SimpleSearch from '@/components/CURD/Query/search'
    import HfTable from '@/components/CURD/Table/HfTable'
    import CurdPagination from '@/components/CURD/pagination/Pagination'
    import HfBaseCompanyInfoColumns from './hfBaseCompanyInfoColumns'
    import FormItemColDict from '@/components/CURD/Form/formItemColDict.vue'
    import FormItemCol from '@/components/CURD/Form/formItemCol.vue'
    import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot.vue'
    export default {
        name: 'HfBaseCompanyInfoInputRefer',
        components: { HfBaseCompanyInfoColumns, CurdPagination, HfTable, SimpleSearch,
          FormItemColDict,
          FormItemCol,
          RowSpanSlot },
        props: {
            value: {
                type: Object,
                require: true
            },
            /**
             * 参照对应的字段ID
             */
            valueReferId: {
                type: [String, Number],
                require: true
            },
            /**
             * 参照对应的字段名
             */
            valueReferName: {
                type: [String, Number],
                require: true
            },
            /**
             * 扩展的参照集合
             */
            valueExpendRefers: {
                type: Object
            }
        },
        data() {
            return {
                showFields: null,
                loading: false,
                showDialog: false,

                /**
                 * 查询的表单信息
                 */
                searchForm: {
                  pkCorp: null,
                  name: null,
                  pkFatherorg: null,
                  creator: null,
                  createTime: null,
                  modifier: null,
                  modifyTime: null,
                  enableState: null,
                  parentId: null,
                  level: null,
                  levelStr: null,
                  sort: null,
                  deleted: null,
                    enableState: 1,
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
                    sortInfo: []
                },
                conf: conf,
                jsonData: {
                    list: [],
                    total: 0
                }
            }
        },
        created() {
          this.doSearch()
        },
        methods: {
            openDialog() {
                this.showDialog = true
            },
            closeDialog() {
                this.showDialog = false
            },
            /**
             * 执行查询操作
             */
            doSearch() {
                if (this.conf.urlMethods && this.conf.urlMethods.pageUrl) {
                    this.loading = true
                    baseApiGetMethod(this.conf.urlMethods.pageUrl, this.searchForm).then(resp => {
                        if (isSuccessResult(resp)) {
                            this.$set(this.jsonData, 'list', getData(resp).list)
                            this.$set(this.jsonData, 'total', getData(resp).total)
                        } else {
                            this.$message.error(getMessage(resp))
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
             * 行点击时候进行赋值
             * @param row
             * @param column
             * @param event
             */
            rowDbClick(row, column, event) {
                if (this.value) {
                    if (this.valueReferId) {
                        this.$set(this.value, this.valueReferId, row.clientId)
                    }
                    if (this.valueReferName) {
                        this.$set(this.value, this.valueReferName, row.clientId)
                    }
                    if (this.valueExpendRefers) {
                        for (const ind in this.valueExpendRefers) {
                            this.$set(this.value, ind, row[this.valueExpendRefers[ind]])
                        }
                    }
                    // 已经选完后要调用的事件
                    this.$emit('selectHandler')
                    this.closeDialog()
                } else {
                    console.log('参照回填错误')
                }
            }
        }
    }
</script>

<style scoped>

</style>
