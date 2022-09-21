<template>
  <simple-table-layout :table-fields="conf.default" :conf="conf">
    <template #btnslist>
      <!-- 列表-->
      <common-dialog-btn :label="$t('common.import')" @success="openSuccess">
        <template v-slot="{ closeDialog }">
          <simple-table-layout :table-fields="conf.default" :conf="conf">
            <!-- 查询框 -->
            <template #search>
              <simple-search v-model="searchForm" :inline="true" @search="doSearch">
                <template v-slot="{ span }">
                  <!-- 新增的的字段配置 -->
                  <slot name="search" :searchForm="searchForm" :span="span" />
                </template>
              </simple-search>
            </template>
            <!-- 列表-->
            <template #btnslist>
              <el-button type="primary" @click="doEnsure(closeDialog)()">{{ $t('common.ensure') }}</el-button>
            </template>
            <template v-slot="{ showFields, heightTable, headerDragend }">
              <hf-table
                ref="referTable"
                v-loading="loading"
                :maxheight="heightTable"
                :row-key="uniqueColumn"
                :table-data="jsonData.list"
                @selection-change="handleSelectionChange"
                @sort-change="sortChange"
                @header-dragend="headerDragend"
              >
                <section-table-column />
                <!-- 显示的字段-->
                <slot :showFields="showFields" :doSearch="doSearch" />
              </hf-table>
            </template>
            <!-- 分页信息 -->
            <template #pagination>
              <curd-pagination
                :current-page.sync="searchForm.pageInfo.pageNo"
                :page-size.sync="searchForm.pageInfo.pageSize"
                :total="jsonData.total"
                @size-change="doSearch"
                @current-change="doSearch"
              />
            </template>
          </simple-table-layout>
        </template>
      </common-dialog-btn>
    </template>
    <template v-slot="{ showFields, heightTable }">
      <hf-table
        v-loading="loading"
        :maxheight="heightTable"
        :table-data="deepValue"
      >
        <section-table-column />
        <!-- 显示的字段-->
        <slot :showFields="showFields" :doSearch="doSearch" />
        <el-table-column
          fixed="right"
          :label="$t('common.operate')"
          width="150"
          align="center"
        >
          <template slot-scope="scopeRow">
            <div class="col-btn-display">
              <el-button type="text" style="color:red" @click="removeRow(scopeRow.row)">{{ $t('common.delete') }}</el-button>
            </div>
          </template>
        </el-table-column>
      </hf-table>
    </template>
  </simple-table-layout>
</template>

<script>
    import { deepClone } from '@/utils'
    import { baseApiGetMethod } from '@/components/CURD/baseApi'
    import { isSuccessResult } from '@/utils/ajaxResultUtil'
    import CurdMixin from '@/components/CURD/curd.mixin'
    export default {
        name: 'QuitMultipleRefer',
        mixins: [CurdMixin],
        props: {
            value: {
                type: Array,
                require: true
            },
            uniqueColumn: {
              type: String,
              require: true,
              default: undefined
            },
            searchFormInit: {
              type: Object,
              default: () => {}
            },
            conf: {
              type: Object,
              default: () => {}
            }
        },
        data() {
            return {
                loading: false,
                deepValue: deepClone(this.value || []),
                searchForm: {
                    ...this.searchFormInit,
                    /**
                     * 分页信息
                     */
                    pageInfo: {
                        pageNo: 1,
                        pageSize: 10
                    },
                    /**
                     * 排序信息
                     */
                    sortInfo: []
                },
                jsonData: {
                    list: [],
                    total: 0
                },
                toggleRowSelectionArray: [],
                lastInternal: null
            }
        },
        watch: {
            value() {
                this.deepValue = deepClone(this.value)
            }
        },
        methods: {
            openSuccess() {
                this.toggleRowSelectionArray = deepClone(this.deepValue || [])
                this.doSearch()
            },
            /**
             * 排序发生变化的时候执行的排序变化
             * @param column
             * @param prop
             * @param order
             */
            sortChange({ column, prop, order }) {
                // 设置排序字段信息
                if (order) {
                    this.searchForm.sortInfo = [{
                        sort: order === 'ascending' ? 0 : (1),
                        fieldName: prop
                    }]
                } else {
                    this.searchForm.sortInfo = []
                }
                // 执行排序
                this.doSearch()
            },
            /**
             * 查询条件变化
             */
            inquiryChangeSearch(query) {
                this.searchForm.query = query
                this.doSearch()
            },
            /**
             * 执行查询操作
             */
            doSearch() {
                if (this.conf.urlMethods && this.conf.urlMethods.pageUrl) {
                    this.loading = true
                    const selectArray = this.toggleRowSelectionArray
                    const selectIds = selectArray ? selectArray.map(s => s[this.uniqueColumn]) : []
                    baseApiGetMethod(this.conf.urlMethods.pageUrl, this.searchForm).then(resp => {
                        if (isSuccessResult(resp)) {
                            this.$set(this.jsonData, 'list', resp.data.list)
                            this.$set(this.jsonData, 'total', resp.data.total)
                            if (selectIds != null) {
                                const selects = resp.data.list.filter(s => selectIds.indexOf(s[this.uniqueColumn]) >= 0)
                                if (this.lastInternal) {
                                  window.clearInterval(this.lastInternal)
                                }
                                this.lastInternal = setInterval(() => {
                                  if (this.$refs.referTable) {
                                    this.$refs.referTable.toggleRowSelection(selects)
                                    window.clearInterval(this.lastInternal)
                                  }
                                }, 100)
                            }
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
             * 选中后处理的事件
             * @param section
             */
            handleSelectionChange(section) {
                if (this.toggleRowSelectionArray) {
                    // 先去掉当前行的，在插入section
                    const sectionIds = section ? section.map(s => s[this.uniqueColumn]) : []
                    const deleteIds = this.jsonData.list.filter(s => sectionIds.indexOf(s[this.uniqueColumn]) < 0).map(s => s[this.uniqueColumn])
                    const deleteIndex = []
                    for (const ind in this.toggleRowSelectionArray) {
                        if (deleteIds.indexOf(this.toggleRowSelectionArray[ind][this.uniqueColumn]) >= 0) {
                            deleteIndex.push(ind)
                        }
                    }
                    // 排序
                    deleteIndex.sort((a, b) => b - a)
                    // 从序号大的开始删除
                    for (const ind in deleteIndex) {
                        this.toggleRowSelectionArray.splice(deleteIndex[ind], 1)
                    }
                    // 插入section
                    if (section && section.length > 0) {
                        const toggleRowSelectionIds = this.toggleRowSelectionArray.map(s => s[this.uniqueColumn])
                        for (const ind in section) {
                            if (toggleRowSelectionIds.indexOf(section[ind][this.uniqueColumn]) < 0) {
                                this.toggleRowSelectionArray.push(section[ind])
                            }
                        }
                    }
                }
            },
            doEnsure(closeDialog) {
                return () => {
                    if (closeDialog) {
                        closeDialog()
                    }
                    this.deepValue = deepClone(this.toggleRowSelectionArray)
                    this.$emit('success', this.deepValue)
                }
            },
            removeRow(row) {
              if (this.deepValue.indexOf(row) >= 0) {
                this.deepValue.splice(this.deepValue.indexOf(row), 1)
              }
              this.$emit('success', this.deepValue)
            }
        }
    }
</script>

<style scoped>

</style>
