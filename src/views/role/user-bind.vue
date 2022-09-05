<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
    class="app-container"
  >
    <div class="userbind">{{ dataList.roleName }}绑定用户</div>
    <el-row style="margin-bottom:none">
      <el-col :span="3">
        <tree-search :data="companydepartsdata" @treeNodeval="treeNodeval" />
      </el-col>
      <el-col :span="21">
        <hfBaseUserInfo :binduserlist="hasSelectList" :post-base-user-info-param="postBaseUserInfoParam" @userbindlist="userbind($event)" />
      </el-col>
    </el-row>
    <div class="btn-rt">
      <el-button>取消</el-button>
      <el-button type="primary" @click="bindUsers()">保存</el-button>
    </div>

  </div>
</template>
<script>
import hfBaseUserInfo from '@/views/basic/hfBaseUserInfo'
import TreeSearch from '../oa/TreeSearch.vue'
import { baseApiGetMethod, baseApiPostMethod } from '@/components/CURD/baseApi'
export default {
  components: { hfBaseUserInfo, TreeSearch },
  props: {
    dataList: {}
  },
  data() {
    return {
      filterText: '',
      companydepartsdata: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      /**
     * 加载中是否显示
     */
      listLoading: false,
      /**
      * 列表字段
      */
      data: {
        list: [],
        total: 0
      },
      tableData: [],
      searchForm: {
        userCode: '',
        userName: '',
        deptName: '',
        companyName: ''
      },
      currentPage4: 4,
      pageData: {
        pageNum: 1,
        pageSize: 10
      },
      // 查找多选框
      pageData1: {
        pageNo: 1,
        pageSize: 100
      },
      fullscreenLoading: false,
      userIds: [],
      alreadyBindUserList: [],
      hasSelectList: [],
      postBaseUserInfoParam: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getCompanyDeparts()
    this.init()
    this.getAlreadyBindUser()
  },
  methods: {
    filterNode(value, data) {
      console.log(value, data, 33)
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },

    handleClick(row) {
      console.log(row)
    },
    treeNodeval(data) {
      this.postBaseUserInfoParam = data
      let param = {}
      param = Object.assign(this.searchForm, this.pageData)

      baseApiGetMethod('/api/hfBaseUserInfo/nameQuery', param).then(
        (resp) => {
          if (resp.retCode === '00001') {
            this.data.list = resp.data.list
            this.data.total = resp.data.total
            console.log(resp.data, 111)
          }
        }
      )
    },
    // 返回点击选择框集合
    userbind(val) {
      this.userIds = val
    },

    // 一页多个
    handleSizeChange(val) {
      this.pageData.pageSize = val
      this.init()
    },
    // 翻页
    handleCurrentChange(val) {
      this.pageData.pageNum = val
      this.init()
    },
    // 通用
    getBaseUserInfo(val) {
      this.listLoading = true
      baseApiGetMethod('/api/hfBaseUserInfo/nameQuery', val).then(
        (resp) => {
          if (resp.retCode === '00001') {
            this.listLoading = false
            this.data.list = resp.data.list
            this.data.total = resp.data.total
          }
        }
      )
    },
    // 获取公司与部门
    getCompanyDeparts() {
      baseApiGetMethod('/api/hfBaseCompanyInfo/companyDeparts').then(
        (resp) => {
          this.fullscreenLoading = true
          if (resp.retCode === '00001') {
            this.companydepartsdata = resp.data.companyInfos
            this.fullscreenLoading = false
          }
        }
      )
    },
    // 角色绑定用户
    bindUsers() {
      const param = {
        'roleId': this.dataList.roleId,
        'userIds': this.userIds
      }
      if (this.userIds.length > 0) {
        baseApiPostMethod('/api/hfBaseRightRole/bindUsers', param).then(
          (resp) => {
            if (resp.retCode === '00001') {
              this.$message({
                showClose: true,
                message: '恭喜你，保存成功',
                type: 'success'
              })
              this.$emit('closeDialog')
            }
          }
        )
      } else {
        this.$message({
          showClose: true,
          message: '你还没有选择用户哦',
          type: 'warning'
        })
      }
    },
    // 从NC同步用户信息
    syncNcData() {
      // syncNcInfoData().then((resp) => {
      //   this.listLoading = true
      //   if (resp.retCode === '00001') {
      //     this.listLoading = false
      //     this.$message({ message: resp.message, type: 'success' })
      //   }
      // })
    },
    // 初始化数据
    init() {
      let param = {}
      const pageInfos = {
        pageInfo: {
          pageNo: this.pageData.pageNum,
          pageSize: this.pageData.pageSize
        }
      }
      param = Object.assign(pageInfos)
      this.getBaseUserInfo(param)
    },

    handleSelectionChange() {
      alert('未选择')
    },
    // 获取角色已绑定用户
    getAlreadyBindUser() {
      baseApiGetMethod(`/api/hfBaseRightRole/bindUsers/${this.dataList.roleId}`, this.pageData1).then(
        (resp) => {
          if (resp.retCode === '00001') {
             this.alreadyBindUserList = resp.data.list
             this.alreadyBindUserList.forEach((item) => {
                    this.hasSelectList.push(item.id)
              })
             this.init()
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.userbind{
  margin-top: -20px;
}
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.app-container {
  .content-rt {
    padding: 20px 0 0 0;
    box-sizing: border-box;

    /deep/ .el-input__inner {
      height: 28px;
      line-height: 36px;
    }

    /deep/ .el-form-item__label {
      font-size: 12px;
    }
  }

  .btn-rt {
    display: flex;
    justify-content: flex-end;
    margin-top: -40px;
  }

  .accout-nav {
    float: right;
    margin-bottom: 20px;
  }
}
</style>
