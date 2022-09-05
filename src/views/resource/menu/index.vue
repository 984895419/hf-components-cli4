<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
    class="app-container"
  >
    <el-col :span="3">
      <menu-tree
        ref="treePannel"
        @tree-node-click="treeNodeClick"
      />
    </el-col>
    <el-col :span="21">
      <hfBaseRightMenu :tree-selected="treeSelected"/>
    </el-col>

  </div>
</template>

<script>
import { fetchMenuList } from '@/api/menu'
// import Pagination from '@/components/Pagination'
// import MenuAdd from './Add'
import MenuTree from './Tree'

import hfBaseRightMenu from '@/views/basic/hfBaseRightMenu'
import { delteMenus } from '@/api/menu'
import { messageErrorHandle, messageSuccesHandle } from '@/utils/message-handle'
import { isEmpty } from 'element-ui/src/utils/util'
import elDragDialog from '@/directive/el-drag-dialog'
import { specificationRegExp } from '@/utils/validate'
export default {
  name: 'MenuList',
  directives: { elDragDialog },
  components: { MenuTree, hfBaseRightMenu },
  data() {
    return {
      treeSelected: [], //  树选中
      multipleSelection: [],
      dialogStatus: 'add',
      textMap: {
        edit: 'edit', /* this. */
        add: 'add',
        detail: 'detail'
      },
      /**
       * 空的查询表单，用于重置的时候的复制
       */
      emptySearchForm: {
        metaTitle: ''
      },
      /**
       * 搜索表单字段
       */
      searchForm: {
        metaTitle: ''
      },
      rules: {
        metaTitle: [
          { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.menu.metaTitle'), trigger: 'blur' },
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ]
      },
      /**
       * 列表字段
       */
      data: {
        list: [],
        total: 0
      },
      /**
       * 加载中是否显示
       */
      listLoading: false,
      /**
       * 分页数据
       */
      pageData: {
        pageNum: 1,
        pageSize: 10
      },
      /**
       * 新增编辑的弹框显示与否
       */
      dialogFormVisible: false,
      fullscreenLoading: false,
      postBaseRightMenuParam: []
    }
  },
  created() {
    this.textMap.edit = this.$t('common.table.edit')
    this.textMap.add = this.$t('common.table.add')
    this.textMap.detail = this.$t('common.table.detail')
    this.getList()
  },
  methods: {
    /**
     * 树点击
     */
    treeNodeClick(data) {
      this.treeSelected = data
      this.getList()
    },
    /**
     * 表格复选框变化
     */
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => {
        return { menuId: item.menuId }
      })
    },
    /**
     * 查询
     */
    getList() {
      if (!this.hasPerm('/menu/queryMenus')) {
        return
      }
      this.listLoading = true
      let param = {}
      param = Object.assign(param, this.searchForm, this.pageData)
      if (!isEmpty(this.treeSelected)) {
        Object.assign(param, { parentMenuId: this.treeSelected.menuId })
      }
      const _this = this
      fetchMenuList(param).then(response => {
        if (response.res === '1') {
          _this.data.list = response.obj.list
          _this.data.total = response.obj.total
        } else {
          messageErrorHandle(_this, response, _this.$t('common.table.search'))
        }
        _this.listLoading = false
      }).catch(() => {
        _this.data.list = []
        _this.data.total = 0
        _this.listLoading = false
      })
    },
    /**
     * 搜索按钮触发时间
     */
    handleSearch() {
      this.pageData.pageNum = 1
      this.pageData.pageSize = 10
      this.getList()
    },
    /**
     * 重置查询条件
     */
    handleReset() {
      for (const key in this.searchForm) {
        if (this.emptySearchForm[key]) {
          this.searchForm[key] = this.emptySearchForm[key]
        } else {
          this.searchForm[key] = ''
        }
      }
    },
    /**
     * 添加操作
     */
    handleAdd() {
      if (isEmpty(this.treeSelected)) {
        this.$message({
          type: 'warning',
          message: this.$t('common.menu.pleaseSelectOneNode')
        })
        return
      }
      this.dialogStatus = 'add'
      this.textMap
      this.dialogFormVisible = true
      const _this = this
      setTimeout(function() {
        _this.$refs.addPannel.setFormData({
          parentMenuId: _this.treeSelected.menuId,
          parentMetaTitle: _this.treeSelected.metaTitle
        })
      }, 100)
    },

    referAdd(rowData) {
      this.dialogStatus = 'add'
      this.textMap
      this.dialogFormVisible = true
      const _this = this
      setTimeout(function() {
        _this.$refs.addPannel.setFormData(Object.assign({}, rowData.row, { menuId: null }))
      }, 100)
    },
    /**
     * 修改按钮编辑
     * @param row
     */
    handleUpdate(rowData, isLook) {
      if (isLook) {
        this.dialogStatus = 'detail'
      } else {
        this.dialogStatus = 'edit'
      }
      this.dialogFormVisible = true
      const _this = this
      /**
       * 延时处理是因为addPannel面板首次还未初始化
       */
      setTimeout(function() {
        _this.$refs.addPannel.setFormData(rowData.row, isLook)
      }, 100)
    },
    /**
     * 新增/修改提交成功时候的数据
     */
    submitSuccess() {
      this.dialogFormVisible = false
      this.$refs.treePannel.getMenuTree(this.treeSelected)
      if (isEmpty(this.treeSelected)) { // 可以设置编辑不用刷新
        this.getList()
      }
    },
    /**
     * 取消时候的调用关闭
     */
    cancel() {
      this.dialogFormVisible = false
    },
    /**
     * 批量删除
     */
    handleDeleteBatch() {
      const _this = this
      if (this.multipleSelection.length > 0) {
        this.$confirm(this.$t('common.table.confirm') + this.$t('common.table.delete'), this.$t('common.infoLevel.warning'), {
          confirmButtonText: this.$t('common.table.confirm'),
          cancelButtonText: this.$t('common.table.cancel'),
          type: 'warning'
        }).then(() => {
          _this.fullscreenLoading = true
          delteMenus(_this.multipleSelection).then(response => {
            if (response.res === '1') {
              messageSuccesHandle(_this, _this.$t('common.table.delete'))
              _this.$refs.treePannel.getMenuTree(_this.treeSelected)
              if (isEmpty(_this.treeSelected)) {
                _this.getList()
              }
            } else {
              messageErrorHandle(_this, response, _this.$t('common.table.delete'))
            }
            _this.fullscreenLoading = false
          })
        }).catch(err => {
          _this.fullscreenLoading = _this
          messageErrorHandle(_this, err, _this.$t('common.table.delete'))
        })
      }
    }
  }
}
</script>

<style scoped>
.operate-nav {
  margin-bottom: 10px;
  direction: rtl;
}
</style>
