<template>
  <div class="app-container">
    <div class="container-title">
      {{ dataList.roleName }}关联的权限列表
    </div>
    <div class="container-main">
      <el-tree
        v-if="openPanel"
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="cid"
        :props="defaultProps"
        :default-checked-keys="treeChecked"
      />
    </div>
    <div class="container-btn">
      <el-button class="transfer-footer" size="small" @click="closeDialog()">取消</el-button>
      <el-button class="transfer-footer" type="primary" size="small" @click="saveMenusData()">保存</el-button>
    </div>

  </div>
</template>

<script>
import { baseApiGetMethod, baseApiPostMethod } from '@/components/CURD/baseApi'
import { getMessage, isSuccessResult, isTheRetCode } from '@/utils/ajaxResultUtil'
export default {
  props: {
    'dataList': {}
  },
  data() {
    return {
      getRightMenusParam: {},
      configOperateRightParam: {},
      menusData: [],
      openPanel: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      methodIds: [],
      menuIds: [],
      newCheckedNodesList: [],
      defaultCheckedKeysList: [],
      nextDefaultCheckedKeysList: []
    }
  },
  computed: {
    treeData() {
        const res = []
        if (this.menusData) {
          return this.iteratorMenus(this.menusData)
        }
        return res
    },
    treeChecked() {
        const res = []
        if (this.menusData) {
            return this.iteratorMenuIds(this.menusData)
        }
        return res
    }
  },
  watch: {
    menusData(val, oldval) {

    }
  },
  created() {
    this.init()
  },
  methods: {
    iteratorMenuIds(menus) {
        let items = []
        if (menus && menus.length > 0) {
            menus.forEach(s => {
                items = items.concat(this.iteratorMenuIds(s.children || s.methods))
                if (s.checked === true && s.methodId) {
                    items.push('METHOD_' + s.methodId)
                }
            })
        }
        return items
    },
    iteratorMenus(menus) {
        const items = []
        if (menus && menus.length > 0) {
            menus.forEach(s => {
                if (s.menuId) {
                    const tb = Object.assign({ cid: 'MENU_' + s.menuId, label: s.menuName }, s)
                    if (s.children) {
                        tb.children = this.iteratorMenus(s.children)
                    } else {
                        if (s.methods) {
                            tb.children = this.iteratorMenus(s.methods)
                        }
                    }
                    items.push(tb)
                }
                if (s.methodId) {
                    items.push(Object.assign({ cid: 'METHOD_' + s.methodId, label: s.displayName }, s))
                }
            })
        }
        return items
    },
    init() {
      // 获取用户拥有的路由权限
      this.getRightMenusParam = {
        'onlyRight': false,
        'roleId': this.dataList.roleId
      }
      this.openPanel = true

      baseApiGetMethod('/api/hfBaseRightMenu/getRightMenus', this.getRightMenusParam).then(
        (resp) => {
          if (isSuccessResult(resp)) {
            this.menusData = resp.data
          } else {
            if (!isTheRetCode('00003')) {
              this.$message.error(getMessage(resp))
            }
          }
        }
      ).catch(e => {
      })

      baseApiGetMethod('/api/hfBaseRightMenu/route').then(
        (resp) => {
          if (isSuccessResult(resp)) {
            this.$store.dispatch('permission/generateRoutes', resp.data)
          } else {
            if (!isTheRetCode('00003')) {
              this.$message.error(getMessage(resp))
            }
          }
        }
      ).catch(e => {
      })
    },
    //  保存权限设置
    saveMenusData() {
        const nodes = this.$refs.tree.getCheckedNodes(false, true)
      if (nodes.length > 0) {
        this.configOperateRightParam = {
          'roleId': this.dataList.roleId,
          'menuIds': nodes.filter(s => s.cid.startsWith('MENU_')).map(t => t.cid.replace('MENU_', '')),
          'methodIds': nodes.filter(s => s.cid.startsWith('METHOD_')).map(t => t.cid.replace('METHOD_', ''))
        }
        baseApiPostMethod('/api/hfBaseRightRole/configOperateRight', this.configOperateRightParam).then(
          (resp) => {
            if (isSuccessResult(resp)) {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              })
              this.init()
              this.$emit('closeDialog')
            } else {
              if (!isTheRetCode('00003')) {
                this.$message.error(getMessage(resp))
              }
            }
          }
        ).catch(e => {
        })
      } else {
        this.$message({
          showClose: true,
          message: '你还没有选择权限',
          type: 'warning'
        })
      }
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }

}
</script>

<style lang="scss" scoped>
.container-title {}

.container-main {
  text-align: center;
  margin: 20px 0 0 0;
}

.container-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
