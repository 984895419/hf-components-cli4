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
        <el-form-item :label="$t('common.menu.parentMetaTitle')+'：'">
          <label>{{ row.parentMetaTitle }}</label>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            :label="$t('common.menu.path')+'：'"
            prop="path"
          >
            <el-input
              v-model.trim="row.path"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="$t('common.menu.sortno')+'：'"
            prop="sortno"
          >
            <el-input
              v-model.trim.number="row.sortno"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            :label="$t('common.menu.metaTitle')+'：'"
            prop="metaTitle"
          >
            <el-input
              v-model.trim="row.metaTitle"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="$t('common.menu.metaIcon')+'：'"
            prop="metaIcon"
          >
            <el-input
              v-model.trim="row.metaIcon"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            :label="$t('common.menu.component')+'：'"
            prop="component"
          >
            <el-input
              v-model.trim="row.component"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="$t('common.menu.redirect')+'：'"
            prop="redirect"
          >
            <el-input
              v-model.trim="row.redirect"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('common.menu.metaNocache')+'：'">
            <el-select
              v-model="row.metaNocache"
              filterable
              :placeholder="$t('common.common.pleaseSelect')"
            >
              <el-option
                label="是"
                value="1"
              />
              <el-option
                label="否"
                value="0"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('common.menu.metaBreadcrumb')+'：'">
            <el-select
              v-model="row.metaBreadcrumb"
              filterable
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
      <el-row>
        <el-col :span="12">
          <el-form-item
            :label="$t('common.menu.name')+'：'"
            prop="name"
          >
            <el-input
              v-model.trim="row.name"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('common.menu.hidden')+'：'">
            <el-select
              v-model="row.hidden"
              filterable
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
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('common.menu.alwaysshow')+'：'">
            <el-select
              v-model="row.alwaysshow"
              filterable
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
import { addMenu, updateMenu } from '@/api/menu'
import { isEmpty } from 'element-ui/src/utils/util'
import { specificationRegExp } from '@/utils/validate'
import { messageErrorHandle, messageSuccesHandle } from '@/utils/message-handle'
export default {
  name: 'MenuAdd',
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
      row: {},
      rowOriginal: {},
      rules: {
        path: [
          { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.menu.path'), trigger: 'blur' },
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ],
        sortno: [
          { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.menu.sortno'), trigger: 'blur' },
          { type: 'number', message: this.$t('common.validate.number'), trigger: 'change' }
        ],
        metaTitle: [
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ],
        metaNocache: [
          { required: true, message: this.$t('common.validate.pleaseInput') + this.$t('common.menu.metaNocache'), trigger: 'blur' }
        ],
        component: [
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ],
        redirect: [
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ],
        name: [
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
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
      if (isEmpty(row.menuId)) {
        row.alwaysshow = '0'
        row.hidden = '0'
        row.metaBreadcrumb = '1'
        row.metaNocache = '1'
      }
      this.row = Object.assign({}, row)
      this.rowOriginal = row
    },
    handleSubmit() {
      // TODO 调用接口传递数据到后台
      this.fullscreenLoading = true
      const _this = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (isEmpty(_this.row.menuId)) {
            addMenu(_this.row).then(response => {
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
            updateMenu(_this.row).then(response => {
              if (response.res === '1') {
                _this.rowOriginal = Object.assign({}, _this.rowOriginal, _this.row)
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
