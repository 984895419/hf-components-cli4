<template>
  <el-col :span="span">
    <el-form-item
      :size="$store.size"
      :label="computeLabel"
      :prop="prop"
      :label-width="labelWidth"
      :required="required"
      :rules="rules"
      :error="error"
    >
      <slot>
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="value[fullPathName]" :src="value[fullPathName]" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </slot>
    </el-form-item>
  </el-col>
</template>
<script>
import {getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import FormItemMixin from './formItem.mixin'
export default {
  name: 'FormItemColUploadImage',
  props: {
    span: {
      type: Number,
      default: undefined
    },
    value: {
      type: Object,
      default: undefined
    },
    rules: {
      type: Object,
      default: undefined
    },
    error: {
      type: String,
      default: undefined
    },
    label: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: undefined
    },
    labelWidth: {
      type: String,
      default: undefined
    },
    /**
     * 完整的路径名称
     */
    fullPathName: {
      type: String
    },
    /**
     * 限制文件大小
     */
    limit: {
      type: Number,
      default: 10
    },
    uploadUrl: {
        type: String,
        default: '/api/upload/image'
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (isSuccessResult(res)) {
          this.$set(this.value, this.prop, getData(res).halfPath)
          this.$set(this.value, this.fullPathName, getData(res).accessUrl)
      } else {
          this.$message.error(getMessage(res))
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = /image\/[jpeg|jpg|gif|png]/.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
          this.$message.error('上传头像图片只能是 ' + 'jpeg,jpg,gif,png' + ' 格式!')
      }
      if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 ' + this.limit + 'MB!')
      }
      return isJPG && isLt2M
    }
  },
  mixins: [FormItemMixin]
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
