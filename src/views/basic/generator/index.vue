<template>
  <el-card class="app-container">
    <div>
      <simple-search v-model="searchForm" :inline="true" @search="doSearch">
        <template v-slot="{ span }">
          <!-- 新增的的字段配置 -->
          <form-item-col
            :value="searchForm"
            :span="span"
            prop="tableName"
            :namespace="conf.namespace"
          />
          <!-- 字典字段字段设置方法如下 -->
        </template>
        <template v-slot:btns>
          <el-button type="primary" v-if="searchForm.tableName" @click="mergerFields">查询并合并字段</el-button>
          <el-button type="primary" v-if="searchForm.tableName" @click="loadFromHistory">从历史记录查询</el-button>
          <el-popconfirm
            style="margin-right: 10px; margin-left: 10px"
            v-if="searchForm.tableName"
            @onConfirm="toSave"
            title="确定保存成记录，如果已经有记录，将进行覆盖"
          >
          <el-button slot="reference" type="primary">保存成记录</el-button>
          </el-popconfirm>
          <el-button type="primary" v-if="searchForm.tableName" @click="submitData">生成代码</el-button>
        </template>
      </simple-search>
    </div>
    <el-form :model="tableInfo" :rules="formRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <generator-prefence-setting-api-solt ref="generatorSetting" v-model="tableInfo" :preference-alias="searchForm.tableName">
        <template v-slot="{ preferenceData, doSave }">
          <el-button v-show="false" ref="saveBtn" type="primary" @click="saveSetting(doSave)"></el-button>
          <el-tabs v-model="activeName">
            <el-tab-pane label="表信息" name="first">
              <first-setting :value="tableInfo" />
            </el-tab-pane>
            <el-tab-pane label="功能列表" name="third">
              <function-setting :value="tableInfo" />
            </el-tab-pane>
            <el-tab-pane label="字段信息" name="second">
              <table-column-preference-setting-api-slot
                v-model="showFields"
                :init-data="tableFields"
                :preference-alias="conf.namespace"
              >
                <template v-slot="{doSave, preferenceData, headerDragend}">
                  <hf-table
                    v-if="showFields"
                    v-model="showFields"
                    v-loading="loading"
                    :table-data="tableInfo.fields"
                    row-key="columnName"
                  >
                    <el-table-column
                      prop="columnName"
                      fixed="left"
                      :label="$t(conf.namespace + '.columnName')"
                      width="130"
                    >
                      <template v-slot:header>
                        {{ $t(conf.namespace + '.columnName') }}
                        <curd-table-column-select
                          v-model="showFields"
                          :preference-alias="conf.namespace"
                          :table-fields="preferenceData"
                          style="float: right"
                          @selectedChange="reRenderTable"
                          @doSave="doSave"
                        />
                      </template>
                    </el-table-column>
                    <div v-for="item in showFields" :key="item.value">
                      <el-table-column
                        v-if="item.value === 'columnType'"
                        prop="columnType"
                        :label="$t(conf.namespace + '.columnType')"
                        min-width="130"
                      />
                      <el-table-column
                        v-if="item.value === 'comment'"
                        prop="comment"
                        :label="$t(conf.namespace + '.comment')"
                        width="130"
                      />
                      <el-table-column
                        v-if="item.value === 'propertyType'"
                        prop="propertyType"
                        :label="$t(conf.namespace + '.propertyType')"
                        min-width="130"
                      />
                      <el-table-column
                        v-if="item.value === 'type'"
                        prop="type"
                        :label="$t(conf.namespace + '.type')"
                        min-width="130"
                      />
                      <el-table-column
                        v-if="item.value === 'keyFlag'"
                        prop="keyFlag"
                        :label="$t(conf.namespace + '.keyFlag')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <div v-if="scopeRow.row.keyFlag === true">是</div>
                          <div v-else>否</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'keyIdentityFlag'"
                        prop="keyIdentityFlag"
                        :label="$t(conf.namespace + '.keyIdentityFlag')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <div v-if="scopeRow.row.keyIdentityFlag === true">是</div>
                          <div v-else>否</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'keyWords'"
                        prop="keyWords"
                        :label="$t(conf.namespace + '.keyWords')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <div v-if="scopeRow.row.keyWords === true">是</div>
                          <div v-else>否</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'supportFuzzySearch' && functionSupport('search')"
                        prop="supportFuzzySearch"
                        :label="$t(conf.namespace + '.supportFuzzySearch')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <el-checkbox v-if="scopeRow.row.propertyType === 'String'" v-model="scopeRow.row.supportFuzzySearch" />
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'supportKeywordSearch' && functionSupport('search')"
                        prop="supportKeywordSearch"
                        :label="$t(conf.namespace + '.supportKeywordSearch')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <el-checkbox v-if="scopeRow.row.propertyType === 'String'" v-model="scopeRow.row.supportKeywordSearch" />
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'supportSearch' && functionSupport('search')"
                        prop="supportSearch"
                        :label="$t(conf.namespace + '.supportSearch')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <el-checkbox v-model="scopeRow.row.supportSearch" />
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'supportAdd' && functionSupport('add')"
                        prop="supportAdd"
                        :label="$t(conf.namespace + '.supportAdd')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <el-checkbox v-model="scopeRow.row.supportAdd" />
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'supportUpdate' && functionSupport('update')"
                        prop="supportUpdate"
                        :label="$t(conf.namespace + '.supportUpdate')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <el-checkbox v-model="scopeRow.row.supportUpdate" />
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'supportExport' && functionSupport('export')"
                        prop="supportExport"
                        :label="$t(conf.namespace + '.supportExport')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <el-checkbox v-model="scopeRow.row.supportExport" />
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'supportImport' && functionSupport('import')"
                        prop="supportImport"
                        :label="$t(conf.namespace + '.supportImport')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <el-checkbox v-model="scopeRow.row.supportImport" />
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'valueReferColumn'"
                        prop="valueReferColumn"
                        :label="$t(conf.namespace + '.valueReferColumn')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <el-checkbox v-model="scopeRow.row.valueReferColumn" />
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'supportEmpty'"
                        prop="supportEmpty"
                        :label="$t(conf.namespace + '.supportEmpty')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <el-checkbox v-model="scopeRow.row.supportEmpty" />
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'referType'"
                        prop="isRefer"
                        :label="$t(conf.namespace + '.referType')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <el-select v-model="scopeRow.row.referType" clearable>
                            <el-option
                              v-for="item in referTypes"
                              :key="item.value"
                              :value="item.value"
                              :label="item.label"
                            />
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'codeReferKey'"
                        prop="codeReferKey"
                        :label="$t(conf.namespace + '.codeReferKey')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <base-business-code-input-refer
                            v-if="scopeRow.row.referType === 'code'"
                            v-model="scopeRow.row"
                            value-refer-id="businessKey"
                            value-refer-name="businessName"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'dictReferType'"
                        prop="dictReferType"
                        :label="$t(conf.namespace + '.dictReferType')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <base-dict-type-input-refer
                            v-if="scopeRow.row.referType === 'dict'"
                            v-model="scopeRow.row"
                            value-refer-id="dictReferType"
                            value-refer-name="dictReferTypeName"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.value === 'regexReferType'"
                        prop="regexReferType"
                        :label="$t(conf.namespace + '.regexReferType')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <base-regex-rule-input-refer
                            v-if="scopeRow.row.referType === 'regex'"
                            v-model="scopeRow.row"
                            value-refer-id="regexReferType"
                            value-refer-name="regexReferTypeName"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column
                          v-if="item.value === 'tableReferType'"
                          prop="tableReferType"
                        :label="$t(conf.namespace + '.tableReferType')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <el-input
                            clearable
                            v-if="scopeRow.row.referType === 'table'"
                            v-model="scopeRow.row.tableReferType"
                            placeholder="表名"/>
                        </template>
                      </el-table-column>

                      <el-table-column
                        v-if="item.value === 'tableReferColumnName'"
                        prop="tableReferColumnName"
                        :label="$t(conf.namespace + '.tableReferColumnName')"
                        min-width="130"
                      >
                        <template slot-scope="scopeRow">
                          <el-select
                            v-if="scopeRow.row.referType === 'table'"
                            v-model="scopeRow.row.tableReferColumnName"
                            clearable>
                            <el-option
                              v-for="fd in tableInfo.fields"
                              :key="fd.propertyName"
                              :label="fd.comment"
                              :value="fd.propertyName"
                              :disabled="fd.propertyName === scopeRow.row.propertyName"
                              ></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                    </div>
                  </hf-table>
                </template>
              </table-column-preference-setting-api-slot>
            </el-tab-pane>
          </el-tabs>
        </template>
      </generator-prefence-setting-api-solt>
    </el-form>
  </el-card>
</template>

<script>
import * as conf from './api'
import SimpleSearch from '../../../components/CURD/Query/search'
import FormItemCol from '../../../components/CURD/Form/formItemCol'
import { baseApiPostMethod } from '../../../components/CURD/baseApi'
import { getData, getMessage, isSuccessResult } from '../../../utils/ajaxResultUtil'
import HfTable from '../../../components/CURD/Table/HfTable'
import FirstSetting from './FirstSetting'
import FunctionSetting from './FunctionSetting'
import BaseBusinessCodeInputRefer from '../baseBusinessCode/inputRefer'
import BaseDictTypeInputRefer from '../baseDictType/inputRefer'
import BaseRegexRuleInputRefer from '../baseRegexRule/inputRefer'
import GeneratorPrefenceSettingApiSolt from '../preferenceSetting/GeneratorPrefenceSettingApiSolt.vue'
import TableColumnPreferenceSettingApiSlot from '../preferenceSetting/TableColumnPrefenceSettingApiSlot'
import CurdTableColumnSelect from '../../../components/CURD/Table/select/TableColumnSelect'
/**
 * 代码生成器
 */
export default {
    name: 'Generator',
    components: {
        CurdTableColumnSelect,
        TableColumnPreferenceSettingApiSlot,
    BaseDictTypeInputRefer,
    BaseBusinessCodeInputRefer,
    BaseRegexRuleInputRefer,
    FunctionSetting,
    FirstSetting,
    HfTable,
    FormItemCol,
    SimpleSearch,
    GeneratorPrefenceSettingApiSolt
},
    data() {
        return {
            showFields: null,
            searchForm: {
                tableName: null
            },
            conf: conf,
            tableInfo: {},
            loading: false,
            activeName: 'second',
            referTypes: [
                {
                    label: '编码',
                    value: 'code'
                },
                {
                    label: '字典',
                    value: 'dict'
                },
                {
                    label: '正则',
                    value: 'regex'
                },
                {
                    label: '其他表',
                    value: 'table'
                }
            ],
            tableFields: conf.default,
            formRules: null
        }
    },
    computed: {
        functionSupport() {
            return (name) => {
                return this.tableInfo.functionList ? this.tableInfo.functionList.filter(s => {
                        return s.functionKey === name && s.support === true
                    }).length > 0 : false
            }
        }
    },
    created() {
      // this.doSearch()
      this.formRules = conf.formRules(this)
    },
    methods: {
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
        doSearch() {
            this.readyDoSearch((val) => {
              this.tableInfo = val
            })
        },
        readyDoSearch(cb) {
            this.loading = true
            if (!this.searchForm.tableName) {
                this.$message.error('请输入查询的表名')
                return
            }
            baseApiPostMethod(this.conf.urlMethods.originUrl + this.searchForm.tableName).then(resp => {
                this.loading = false
                if (isSuccessResult(resp)) {
                    cb(getData(resp))
                } else {
                    this.$message.error(getMessage(resp))
                }
            }).catch(e => {
                this.loading = false
            })
        },
        mergerFields() {
            this.readyDoSearch((val) => {
              const fieldNames = this.tableInfo.fields.map(t => t.columnName)
              for (const field in val.feilds) {
                if (fieldNames.indexOf(field.columnName) < 0) {
                  this.tableInfo.fields.push(field)
                }
              }
            })
        },
        loadFromHistory() {
          this.$refs.generatorSetting.doQuery()
        },
        saveSetting(doSave) {
            doSave(this.tableInfo)
        },
        toSave() {
            debugger
            if (this.$refs.saveBtn) {
                this.$refs.saveBtn.handleClick()
            }
        },
        submitData() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                      baseApiPostMethod(this.conf.urlMethods.submitUrl + this.searchForm.tableName, this.tableInfo).then(resp => {
                        if (isSuccessResult(resp)) {
                            this.$message.success(getMessage(resp))
                        } else {
                            this.$message.error(getMessage(resp))
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
