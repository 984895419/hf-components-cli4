<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
    <el-form
      ref="form"
      :model="row"
      :rules="rules"
      label-width="100px"
    >
      <el-row>
        <el-form-item :label="$t('common.menu.metaTitle')+'：'">
          <label>{{ row.metaTitle }}</label>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            :label="$t('common.operate.operatName')+'：'"
            prop="operatName"
          >
            <el-input
              v-model.trim="row.operatName"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="$t('common.operate.operatUrl')+'：'"
            prop="operatUrl"
          >
            <el-input
              v-model.trim="row.operatUrl"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            :label="$t('common.operate.operatType')+'：'"
            prop="operatType"
          >
            <el-select
              v-model.trim="row.operatType"
              filterable
              clearable
              :placeholder="$t('common.common.pleaseSelect')"
            >
              <el-option
                v-for="(value, key) in operatTypeMap"
                :key="key"
                :label="value"
                :value="key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="$t('common.operate.operatWay')+'：'"
            prop="operatWay"
          >
            <el-select
              v-model.trim="row.operatWay"
              filterable
              clearable
              :placeholder="$t('common.common.pleaseSelect')"
            >
              <el-option
                v-for="(value, key) in operatWayMap"
                :key="key"
                :label="value"
                :value="key"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('common.operate.isLog')+'：'">
            <el-select
              v-model.trim="row.isLog"
              filterable
              clearable
              :placeholder="$t('common.common.pleaseSelect')"
            >
              <el-option
                v-for="item in constMap"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        v-if="!isLook"
        class="edit-button-item"
      >
        <el-button @click="handleCancel">{{ $t('common.common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >{{ $t('common.common.save') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addOperate, updateOperate } from '@/api/operate'
import { isEmpty } from 'element-ui/src/utils/util'
import { specificationRegExp } from '@/utils/validate'
import { messageErrorHandle, messageSuccesHandle } from '@/utils/message-handle'
export default {
  name: 'OperateAdd',
  /*
  * props 父组件传过来的变量
  * */
  props: {
    operatTypeMap: {
      type: Object,
      default: () => { }
    },
    operatWayMap: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      isLook: true,
      constMap: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      row: {}, // 表单数据对象
      rowOriginal: {}, // 父组件传过来的表单数据对象
      rules: { // 校验规则
        operatName: [
          { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.operate.operatName'), trigger: 'blur' },
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ],
        operatUrl: [
          { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.operate.operatUrl'), trigger: 'blur' },
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ],
        operatType: [
          { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.operate.operatType'), trigger: 'blur' }
        ],
        operatWay: [
          { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.operate.operatWay'), trigger: 'blur' }
        ],
        isLog: [
          { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.operate.isLog'), trigger: 'blur' }
        ]

      },
      fullscreenLoading: false
    }
  },
  created() {
  },
  methods: {
    setFormData(row, isLook) {
      this.isLook = isLook
      // TODO 从后台查询数据
      if (isEmpty(row.operatId)) {
        row.isLog = '1' // 初始值
        row.operatWay = '1'
      }
      this.row = Object.assign({}, row)
      this.rowOriginal = row // rowOriginal的值改变，表格的值也会随之改变
    },
    handleSubmit() { // 提交按钮
      // TODO 调用接口传递数据到后台
      this.fullscreenLoading = true
      const _this = this
      this.$refs.form.validate((valid) => { // 校验
        if (valid) {
          if (isEmpty(_this.row.operatId)) {
            addOperate(_this.row).then(response => {
              if (response.res === '1') {
                _this.$emit('submit-success')
                messageSuccesHandle(_this, _this.$t('common.table.add'))
              } else {
                messageErrorHandle(_this, response, _this.$t('common.table.add'))
              }
              _this.fullscreenLoading = false
            }).catch(err => {
              _this.fullscreenLoading = false
              messageErrorHandle(this, err, this.$t('common.table.add'))
              console.error(err)
            })
          } else {
            updateOperate(_this.row).then(response => {
              if (response.res === '1') {
                _this.rowOriginal = Object.assign({}, _this.rowOriginal, _this.row) // 免刷新，不需要重新查询
                _this.$emit('submit-success')
                messageSuccesHandle(_this, _this.$t('common.table.edit'))
              } else {
                messageErrorHandle(_this, response, _this.$t('common.table.edit'))
              }
              _this.fullscreenLoading = false
            }).catch(err => {
              _this.fullscreenLoading = false
              messageErrorHandle(_this, err, _this.$t('common.table.edit'))
              console.error(err)
            })
          }
        } else {
          _this.fullscreenLoading = false
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 100%;
}
.edit-button-item {
  direction: rtl;
}
</style>
