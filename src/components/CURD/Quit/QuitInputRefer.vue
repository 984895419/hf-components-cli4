<template>
  <div>
    <el-input
      v-model="value[valueReferName]"
      v-bind="$attrs"
      :placeholder="computedPlaceholder"
      @focus="openDialog"
      v-on="$listeners"
    />
    <hf-dialog
      :visible.sync="showDialog"
      v-bind="$attrs._dialog"
    >
      <div style="margin-top: 10px">
        <!-- 查询框 -->
        <simple-table-layout :table-fields="conf.default" :conf="conf">
          <template #search>
            <simple-search v-model="searchForm" :inline="true" @search="doSearch">
              <template v-slot="{ span }">
                <slot :span="span" :searchForm="searchForm" name="search" />
              </template>
              <template #advanced>
                <slot :span="span" :searchForm="searchForm" name="advanced" />
              </template>
            </simple-search>
          </template>
          <template v-slot="{ showFields, headerDragend, heightTable }">
            <!-- 列表-->
            <hf-table
              v-loading="loading"
              :table-data="jsonData.list || []"
              :maxheight="heightTable"
              @row-dblclick="rowDbClick"
              @header-dragend="headerDragend"
            >
              <!-- 显示的字段-->
              <slot :showFields="showFields" :doSearch="doSearch" />
            </hf-table>
          </template>
          <template #pagination>
            <!-- 分页信息 -->
            <curd-pagination
              :current-page.sync="searchForm.pageInfo.pageNo"
              :page-size.sync="searchForm.pageInfo.pageSize"
              :total="jsonData.total"
              @size-change="doSearch"
              @current-change="doSearch"
            />
          </template>
        </simple-table-layout>
      </div>
    </hf-dialog>
  </div>
</template>

<script>
    import { baseApiGetMethod } from '@/components/CURD/baseApi'
    import { isSuccessResult } from '@/utils/ajaxResultUtil'
    import { getData, getMessage } from '@/utils/ajaxResultUtil'
    export default {
        name: 'QuitInputRefer',
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
                type: Array
            },
            /**
             * 初始查询条件
             */
            searchFormInit: {
              type: Object,
              default: () => {}
            },
            /**
             * 配置信息
             */
            conf: {
              type: Object,
              required: true
            },
            /**
             * 被引用表的主键
             */
            idProp: {
              type: String
            },
            /**
             * 被引用表显示的名称
             */
            nameProp: {
              type: String
            }
        },
        data() {
            return {
                loading: false,
                showDialog: false,
                /**
                 * 是否已经初始化，在首次调用openDialog得时候触发
                 */
                alreadyInit: false,

                /**
                 * 查询的表单信息
                 */
                searchForm: {
                    ...this.searchFormInit,
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
                jsonData: {
                    list: [],
                    total: 0
                }
            }
        },
        computed: {
          /**
           * placeholder占位符的默认规则
           * @returns {*}
           */
          computedPlaceholder() {
            if (this.$attrs['placeholder']) {
              return this.$attrs['placeholder']
            }
            const placeholderKey = this.conf.namespace + '.' + this.valueReferName + 'Placeholder'
            const defaultPlaceholder = this.$t(placeholderKey)
            if (defaultPlaceholder !== placeholderKey) {
              return defaultPlaceholder
            }
            return this.$t('common.pleaseSelect') + this.computeLabel
          },
          /**
           * 标签规则
           * @returns {string}
           */
          computeLabel() {
            return this.label ? this.label : (this.conf.namespace ? this.$t(this.conf.namespace + '.' + this.valueReferName) : '')
          }
        },
        methods: {
            openDialog() {
                if (!this.alreadyInit) {
                  this.doSearch()
                }
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
                    this.alreadyInit = true
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
                        this.$set(this.value, this.valueReferId, row[this.idProp])
                    }
                    if (this.valueReferName) {
                        this.$set(this.value, this.valueReferName, row[this.nameProp])
                    }
                    if (this.valueExpendRefers) {
                        for (const ind in this.valueExpendRefers) {
                            this.$set(this.value, this.valueExpendRefers[ind], row[this.valueExpendRefers[ind]])
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
