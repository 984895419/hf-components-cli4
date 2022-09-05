<template>
    <table-column-preference-setting-api-slot
            v-model="showFields"
            :init-data="tableFields"
            :preference-alias="conf.namespace"
    >
        <template v-slot="{doSave, preferenceData, headerDragend}">
            <!-- 列表-->
            <common-dialog-btn :label="$t('common.import')" style="margin-bottom: 10px" @success="openSuccess">
                <template v-slot="{ closeDialog }">
                    <!-- 查询框 -->
                    <div>
                        <simple-search v-model="searchForm" :inline="true" @search="doSearch">
                            <template v-slot="{ span }">
                                <!-- 新增的的字段配置 -->
                                                                        <form-item-col
                                                :value="searchForm"
                                                :span="span"
                                                prop="typeCode"
                                                :namespace="conf.namespace"
                                        />
                                        <form-item-col
                                                :value="searchForm"
                                                :span="span"
                                                prop="name"
                                                :namespace="conf.namespace"
                                        />
                                        <form-item-col
                                                :value="searchForm"
                                                :span="span"
                                                prop="dictKey"
                                                :namespace="conf.namespace"
                                        />
                                        <form-item-col
                                                :value="searchForm"
                                                :span="span"
                                                prop="dictValue"
                                                :namespace="conf.namespace"
                                        />
                                        <form-item-col
                                                :value="searchForm"
                                                :span="span"
                                                prop="enableState"
                                                :namespace="conf.namespace"
                                        />
                            </template>
                        </simple-search>
                    </div>
                    <!-- 列表-->
                    <el-button type="primary" style="margin-bottom: 5px" @click="doEnsure(closeDialog)()">{{ $t('common.ensure') }}</el-button>
                    <hf-table
                            ref="referTable"
                            v-loading="loading"
                            :row-key="uniqueColumn"
                            :table-data="jsonData.list"
                            @selection-change="handleSelectionChange"
                            @sort-change="sortChange"
          @header-dragend="headerDragend"
                    >
                        <el-table-column
                                fixed="left"
                                type="selection"
                                width="40"
                        />
                        <!-- 显示的字段-->
                        <base-dict-value-columns :show-fields="showFields" :url-methods="conf.urlMethods" @success="doSearch" />
                        <el-table-column
                                fixed="right"
                                :label="$t('common.operate')"
                                width="0"
                        >
                            <template v-slot:header>
                                {{ $t('common.operate') }}
                                <curd-table-column-select
                                        v-model="showFields"
                                        :preference-alias="conf.namespace"
                                        :table-fields="preferenceData"
                                        style="float: right"
                                        @selectedChange="reRenderTable"
                                        @doSave="doSave"
                                />
                            </template>
                            <template slot-scope="scopeRow">
                                <div class="col-btn-display">
                                    <!-- 删除-->
                                    <del-btn
                                            :url="templateUrl(conf.urlMethods.deleteUrl, scopeRow.row)"
                                            :btn-type="'text'"
                                            :value="scopeRow.row"
                                            @success="doSearch"
                                    />
                                </div>
                            </template>
                        </el-table-column>
                    </hf-table>
                    <!-- 分页信息 -->
                    <curd-pagination
                            :current-page.sync="searchForm.pageInfo.pageNo"
                            :page-size.sync="searchForm.pageInfo.pageSize"
                            :total="jsonData.total"
                            @size-change="doSearch"
                            @current-change="doSearch"
                    />
                </template>
            </common-dialog-btn>
            <hf-table
                    v-loading="loading"
                    :table-data="deepValue"
            >
                <section-table-column/>
                <!-- 显示的字段-->
                <base-dict-value-columns :show-fields="showFields" :url-methods="conf.urlMethods" @success="doSearch" />
                <el-table-column
                        fixed="right"
                        :label="$t('common.operate')"
                        width="150"
                >
                    <template v-slot:header>
                        {{ $t('common.operate') }}
                        <curd-table-column-select
                                v-model="showFields"
                                :preference-alias="conf.namespace"
                                :table-fields="preferenceData"
                                style="float: right"
                                @selectedChange="reRenderTable"
                                @doSave="doSave"
                        />
                    </template>
                    <template slot-scope="scopeRow">
                        <div class="col-btn-display">
                            <!-- 删除-->
                            <del-btn
                                :btn-type="'text'"
                                :value="scopeRow.row"
                                :deleteHandler="doDelete"
                            />
                        </div>
                    </template>
                </el-table-column>
            </hf-table>
        </template>
    </table-column-preference-setting-api-slot>
</template>

<script>
    import * as conf from './api'
    import { deepClone } from '@/utils'
    import { baseApiGetMethod } from '@/components/CURD/baseApi'
    import { isSuccessResult } from '@/utils/ajaxResultUtil'
    import SimpleSearch from '@/components/CURD/Query/search'
    import FormItemCol from '@/components/CURD/Form/formItemCol'
    import CurdMixin from '@/components/CURD/curd.mixin'
    import CurdPagination from '@/components/CURD/pagination/Pagination'
    import HfTable from '@/components/CURD/Table/HfTable'
    import BaseDictValueColumns from './baseDictValueColumns'
    import DelBtn from '@/components/CURD/Btns/DelBtn'
    import CurdTableColumnSelect from '@/components/CURD/Table/select/TableColumnSelect'
    import CommonDialogBtn from '@/components/CURD/Btns/CommonDialogBtn'
    import TableColumnPreferenceSettingApiSlot from '@/views/basic/preferenceSetting/TableColumnPrefenceSettingApiSlot'
    import SectionTableColumn from '@/components/CURD/Table/column/base/SectionTableColumn'

    export default {
        name: 'BaseDictValueMultipleRefer',
        components: {
            SectionTableColumn,
            TableColumnPreferenceSettingApiSlot,
            CommonDialogBtn,
            CurdTableColumnSelect,
            DelBtn, BaseDictValueColumns,
            HfTable, CurdPagination, FormItemCol, SimpleSearch },
        mixins: [CurdMixin],
        props: {
            value: {
                type: Array,
                require: true
            }
        },
        data() {
            return {
                showFields: null,
                loading: false,
                conf: conf,
                uniqueColumn: 'valueId',
                deepValue: deepClone(this.value || []),
                searchForm: {
                    valueId: null,
                    typeCode: null,
                    name: null,
                    dictKey: null,
                    dictValue: null,
                    enableState: 1,

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
                tableFields: conf.default,
                toggleRowSelectionArray: []
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
            reRenderTable(res) {
                // 扩展显示的字段
                this.showFields = []
                // 标记为重新渲染中
                this.reRending = true
                setTimeout(() => {
                    this.showFields = res
                    // 标记为重新渲染中
                    this.reRending = false
                }, 50)
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
                                this.$nextTick(() => this.$refs.referTable.toggleRowSelection(selects))
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
                    if (!section) {

                    }
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
            doDelete(row) {
                if (this.deepValue.indexOf(row) >= 0) {
                    this.deepValue.splice(this.deepValue.indexOf(row), 1)
                    this.$emit('success', this.deepValue)
                }
            }
        }
    }
</script>

<style scoped>

</style>
