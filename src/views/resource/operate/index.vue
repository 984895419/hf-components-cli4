<template>
  <!--
    vue 基础语法
      状态管理模式
      属性冒号: 或者v-bind: 单向绑定，将js中的数据赋值到html中   注：有冒号和没有冒号的区别： 冒号后面的是表达式，没有冒号的是字符串
      事件@     或者v-on 事件
      属性v-model  双向绑定
      属性v-html 输出代码
      标签间文本 {{ 属性名 }}
  -->
  <!--
      Loading 加载组件
      全屏遮罩 通过变量fullscreenLoading来控制
  -->
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
    class="app-container"
  >
    <!--
      layout布局
      <el-row>和 <el-col :span="3">
    -->
    <el-col :span="3">
      <!--
        自定义组件
        父组件获取子组件的data和方法
        1.ref：可以通过ref获取子组件的属性和方法，$refs.treePannel.属性/方法
        其他说明见<operate-add>上的注释
      -->
      <left-tree
        ref="treePannel"
        @tree-node-click="treeNodeClick"
      />
    </el-col>
    <el-col :span="21">
      <baseHandlerMappingMethod :tree-selected="treeSelected" :controller-id="treeSelected ? treeSelected.controllerId : undefined"/>
    </el-col>

  </div>
</template>

<script>
// 一个文件就相当于一个模块。。
// 模块之间的变量不通用，可以相同名字。
// 模块之间的引用，通过import
// 模块中的属性/方法 通过 export 暴露出去
// import 后的'@' 表示 /src 目录
// ./ 表示当前目录
// @/api/目录下的是 和后台对接的接口调用
import Pagination from '@/components/Pagination'
import OperateAdd from './Add'
import LeftTree from './Tree'
import { getCodeMap } from '@/api/dict'
import { delteOperates, fetchOperateList, exportCurPage, exportAll, exportSelect } from '@/api/operate'
import { messageErrorHandle, messageSuccesHandle } from '@/utils/message-handle'
import { isEmpty } from 'element-ui/src/utils/util'
import elDragDialog from '@/directive/el-drag-dialog'
import { specificationRegExp } from '@/utils/validate'
import AdvanceSearch from '@/components/AdvanceSearch'
import FileUpload from '@/components/FileUpload'
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
import baseHandlerMappingMethod from '@/views/basic/baseHandlerMappingMethod'

export default {
  name: 'OperateList', // 组件名称  Pascal命名法
  directives: { elDragDialog, clipboard }, // 自定义指令 拖拽
  components: { FileUpload, AdvanceSearch, Pagination, OperateAdd, LeftTree, baseHandlerMappingMethod }, // 分页，添加修改页面，菜单树
  data() { // vue 数据函数，可以理解为对象属性
    /* 自定义校验规则
      let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };*/
    return {
      operatTypeMap: {
        1: '新增',
        2: '修改',
        3: '删除'
      },
      operatWayMap: {
        1: '访问越权',
        2: '按钮权限'
      },
      treeSelected: [], //  树选中
      multipleSelection: [], // 表格 勾选记录
      multipleSelectData: [], // 表格 勾选记录详细，用于导出
      dialogStatus: 'add', // 对话框状态，新增或者修改
      textMap: { // 对话框标题
        edit: 'edit', /* this. */
        add: 'add',
        detail: 'detail'
      },
      /**
       * 空的查询表单，用于重置的时候的复制
       */
      emptySearchForm: {
        operatName: '',
        operatUrl: '',
        operatType: '',
        operatWay: ''
      },
      /**
       * 搜索表单字段
       */
      searchForm: {
        operatName: '',
        operatUrl: '',
        operatType: '',
        operatWay: ''
      },
      rules: { // 校验规则
        operatName: [
          // required 必填，会自动加红色* ； message：提示信息 ； trigger： 校验触发事件
          // { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.operate.operatName'), trigger: 'blur' },
          // pattern 校验规则
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ],
        operatUrl: [
          // { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.operate.operatName'), trigger: 'blur' },
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ]
        // 也可以自定义校验规则， 查看form组件资料
        /* pass: [
          { validator: validatePass, trigger: 'blur' }
        ] */
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
      /**
       * 全屏加载中是否显示
       */
      fullscreenLoading: false
    }
  },
  /**
   * 组件加载时调用；可以理解为初始化函数
   */
  created() {
    this.textMap.edit = this.$t('common.table.edit')
    this.textMap.add = this.$t('common.table.add')
    this.textMap.detail = this.$t('common.table.detail')
    this.getList()
  },
  /**
   * 可以理解为组件成员方法
   */
  methods: {

    /**
     * format开头的，为格式化函数
     */
    formatOperatType(row, column, cellValue, index) {
      return this.operatTypeMap[cellValue]
    },
    formatOperatWay(row, column, cellValue, index) {
      return this.operatWayMap[cellValue]
    },
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
        return { operatId: item.operatId }
      })
      this.multipleSelectData = val
    },
    /**
     * 查询
     */
    getList() {
      if (!this.hasPerm('/operate/queryOperates')) {
        return
      }
      this.listLoading = true
      let param = {}
      param = Object.assign(param, this.searchForm, this.pageData)
      if (!isEmpty(this.treeSelected)) {
        Object.assign(param, { menuId: this.treeSelected.menuId })
      }
      const _this = this
      fetchOperateList(param).then(response => {
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
      this.$refs.searchForm.validate((valid) => { // 校验
        if (valid) {
          this.pageData.pageNum = 1
          this.pageData.pageSize = 10
          this.getList()
        }
      })
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
      this.dialogFormVisible = true
      const _this = this
      setTimeout(function() {
        // 通过 refs对象 获取子组件对象
        _this.$refs.addPannel.setFormData({
          menuId: _this.treeSelected.menuId,
          metaTitle: _this.treeSelected.metaTitle
        })
      }, 100)
    },

    referAdd(rowData) {
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      const _this = this
      setTimeout(function() {
        _this.$refs.addPannel.setFormData(Object.assign({}, rowData.row, { operatId: null }))
      }, 100)
    },

    copyData(rowData) {
      return JSON.stringify(Object.assign({}, rowData.row, { operatId: null, menuId: null, metaTitle: null }))
    },

    pasteInto(e) {
      let clipboardData = e.clipboardData
      if (!clipboardData) {
        // chrome
        clipboardData = e.originalEvent.clipboardData
      }
      const data = clipboardData.getData('Text')
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      const _this = this
      setTimeout(function() {
        _this.$refs.addPannel.setFormData(Object.assign({}, rowData.row, { operatId: null }))
      }, 100)
    },

    /**
     * 修改按钮编辑
     * @param row
     */
    handleUpdate(rowData, isLook) {
      if (isLook) {
        this.dialogStatus = 'edit'
      } else {
        this.dialogStatus = 'detail'
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
      this.getList()
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
          delteOperates(_this.multipleSelection).then(response => {
            if (response.res === '1') {
              messageSuccesHandle(_this, _this.$t('common.table.delete'))
              this.getList()
            } else {
              messageErrorHandle(_this, response, _this.$t('common.table.delete'))
            }
            _this.fullscreenLoading = false
          })
        }).catch(err => {
          _this.fullscreenLoading = false
          messageErrorHandle(_this, err, _this.$t('common.table.delete'))
        })
      }
    },
    handleUpload() {
      this.$refs.fileupload.openDialog()
    },
    handleExport(command) {
      const _this = this
      this.fullscreenLoading = true
      if (command === 'exportCurPage') {
        exportCurPage(_this.data.list).then(response => {
          this.$util.downloadFile(response)
          _this.fullscreenLoading = false
        })
      } else if (command === 'exportAll') {
        let param = {}
        param = Object.assign(param, this.searchForm, this.pageData)
        if (!isEmpty(this.treeSelected)) {
          Object.assign(param, { menuId: this.treeSelected.menuId })
        }
        exportAll(param).then(response => {
          this.$util.downloadFile(response)
          _this.fullscreenLoading = false
        })
      } else if (command === 'exportSelect') {
        exportSelect(_this.multipleSelectData).then(response => {
          this.$util.downloadFile(response)
          _this.fullscreenLoading = false
        })
      }
    }
  }
}
</script>

<style scoped>
/* 按钮右靠齐*/
.operate-nav {
  margin-bottom: 10px;
  direction: rtl;
}
</style>
