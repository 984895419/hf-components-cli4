<template>
  <el-card class="app-container">
    <!-- 查询框 -->
    <div>
      <simple-search v-model="searchForm" :inline="true" @search="doSearch">
        <template v-slot="{ span }">
          <!-- 新增的的字段配置 -->
          <form-item-col :value="searchForm" :span="span" prop="roleName" :namespace="conf.namespace" />
          <form-item-col :value="searchForm" :span="span" prop="roleDesc" :namespace="conf.namespace" />
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
    <!-- 操作栏-->
    <div style="margin-bottom: 10px" class="col-btn-display">
      <hf-base-right-role-add :action-url="conf.urlMethods.addUrl" @success="doSearch" />
      <div style="float: right" class="col-btn-display">
        <del-btn
          v-if="conf.urlMethods.deleteUrl
            && toggleRowSelectionArray.length > 0"
          :url="templateUrl(conf.urlMethods.deleteUrl, toggleRowSelectionArray)"
          :value="toggleRowSelectionArray"
          :label="$t('common.batchDelete')"
          @success="doSearch"
        />
        <template-confirm-btn
          v-if="conf.urlMethods.enableUrl
            && toggleRowSelectionArray.length > 0"
          :url="templateUrl(conf.urlMethods.enableUrl, toggleRowSelectionArray)"
          :btn-type="'primary'"
          :label="$t('common.batchEnable')"
          :value="toggleRowSelectionArray"
          @success="doSearch"
        />
        <template-confirm-btn
          v-if="conf.urlMethods.disableUrl
            && toggleRowSelectionArray.length > 0"
          :url="templateUrl(conf.urlMethods.disableUrl, toggleRowSelectionArray)"
          :btn-type="'primary'"
          :value="toggleRowSelectionArray"
          :label="$t('common.batchDisable')"
          @success="doSearch"
        />
      </div>
    </div>
    <!-- 列表-->
    <table-column-preference-setting-api-slot
      v-model="showFields"
      :init-data="tableFields"
      :preference-alias="conf.namespace"
    >
      <template v-slot="{ doSave, preferenceData, headerDragend }">
        <hf-table
          v-if="showFields"
          v-loading="loading"
          :table-data="jsonData.list"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
          @header-dragend="headerDragend"
        >
          <section-table-column />
          <!-- 显示的字段-->
          <hf-base-right-role-columns :show-fields="showFields" :url-methods="conf.urlMethods" @success="doSearch" />
          <el-table-column fixed="right" :label="$t('common.operate')" width="150">
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
                <!-- 更新 -->
                <hf-base-right-role-update
                  v-if="scopeRow.row.initData !== 1"
                  v-permission="['hfBaseRightRole:update']"
                  :value="scopeRow.row"
                  :query-url="conf.urlMethods.queryUrl"
                  :update-url="conf.urlMethods.updateUrl"

                  @success="doSearch"
                />
                <!-- 删除-->
                <del-btn
                  v-if="scopeRow.row.initData !== 1"
                  v-permission="['hfBaseRightRole:delete']"
                  :url="templateUrl(conf.urlMethods.deleteUrl, scopeRow.row)"
                  :btn-type="'text'"
                  :value="scopeRow.row"
                  @success="doSearch"
                />
                <!-- 查看 -->
                <hf-base-right-role-detail :value="scopeRow.row" />
                <!-- 绑定用户 -->
                <dialog-Btn-Page v-if="scopeRow.row.initData !== 1" :label="'绑定用户'" :type="'text'">
                  <template slot-scope="{ closeDialog }">
                    <user-bind :data-list="scopeRow.row" @closeDialog="closeDialog" />
                  </template>
                </dialog-Btn-Page>
                <!-- 权限设置 -->
                <dialog-Btn-Page v-if="scopeRow.row.initData !== 1" :label="'权限设置'" :type="'text'">
                  <template slot-scope="{ closeDialog }">
                    <permission-setting :data-list="scopeRow.row" @closeDialog="closeDialog" />
                  </template>
                </dialog-Btn-Page>
              </div>
            </template>
          </el-table-column>
        </hf-table>
      </template>
    </table-column-preference-setting-api-slot>
    <!-- 分页信息 -->
    <curd-pagination
      :current-page.sync="searchForm.pageInfo.pageNo"
      :page-size.sync="searchForm.pageInfo.pageSize"
      :total="jsonData.total"
      @size-change="doSearch"
      @current-change="doSearch"
    />
  </el-card>
</template>

<script>
import * as conf from './api'
import HfBaseRightRoleAdd from './add'
import HfTable from '@/components/CURD/Table/HfTable'
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { isSuccessResult } from '@/utils/ajaxResultUtil'
import CurdPagination from '@/components/CURD/pagination/Pagination'
import HfBaseRightRoleUpdate from './update'
import DelBtn from '@/components/CURD/Btns/DelBtn'
import CurdMixin from '@/components/CURD/curd.mixin'
import CurdTableColumnSelect from '@/components/CURD/Table/select/TableColumnSelect'
import HfBaseRightRoleDetail from './detail'
import HfBaseRightRoleColumns from './hfBaseRightRoleColumns'
import TemplateConfirmBtn from '@/components/CURD/Btns/TemplateConfirmBtn'
import FormItemColDict from '@/components/CURD/Form/formItemColDict.vue'
import FormItemCol from '@/components/CURD/Form/formItemCol.vue'
import SimpleSearch from '@/components/CURD/Query/search'
import TableColumnPreferenceSettingApiSlot from '@/views/basic/preferenceSetting/TableColumnPrefenceSettingApiSlot'
import SectionTableColumn from '@/components/CURD/Table/column/base/SectionTableColumn'
import UserBind from '@/views/role/user-bind.vue'
import RoleSettings from '@/views/role/permission-setting.vue'
import DialogBtnPage from '@/components/CURD/Btns/DialogBtnPage'
import PermissionSetting from '@/views/role/permission-setting.vue'

export default {
  name: 'HfBaseRightRoleIndexVue',
  components: {
    SectionTableColumn,
    TemplateConfirmBtn,
    HfBaseRightRoleColumns,
    HfBaseRightRoleDetail,
    CurdTableColumnSelect,
    DelBtn,
    HfBaseRightRoleUpdate,
    CurdPagination,
    HfTable, HfBaseRightRoleAdd,
    FormItemColDict,
    FormItemCol,
    SimpleSearch,
    TableColumnPreferenceSettingApiSlot,
    UserBind,
    RoleSettings,
    DialogBtnPage,
    PermissionSetting
  },
  mixins: [CurdMixin],

  data() {
    return {
      db: {},
      showFields: null,
      loading: false,
      /**
       * 查询的表单信息
       */
      searchForm: {
        roleId: null,
        roleName: null,
        tenantId: null,
        roleDesc: null,
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
      },
      tableFields: conf.default,
      toggleRowSelectionArray: []
    }
  },

  mounted() {
  },
  created() {
    this.doSearch()
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
     * 选中后处理的事件
     * @param section
     */
    handleSelectionChange(section) {
      this.toggleRowSelectionArray = section
    },
    checkboxHasSelect(val) {
      console.log(val)
    },
    /**
     * 执行查询操作
     */
    doSearch() {
      if (this.conf.urlMethods && this.conf.urlMethods.pageUrl) {
        this.loading = true
        baseApiGetMethod(this.conf.urlMethods.pageUrl, this.searchForm).then(resp => {
          if (isSuccessResult(resp)) {
            this.$set(this.jsonData, 'list', resp.data.list)
            this.$set(this.jsonData, 'total', resp.data.total)
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
    }

  }
}
</script>

<style scoped>
/deep/ .col-btn-display>div,
.col-btn-display>.el-button {
  display: inline-block;
  margin-right: 10px;
}
</style>
