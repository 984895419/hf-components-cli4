<template>
 <div class="app-container">
   <el-row>
     <el-col :span="12" :offset="6">
       <el-card>
         <cu-form ref="ruleForm" :value="formData" :form-rules="formDataRules" :namespace="namespace" :action-method="doSubmit">
           <template v-slot="{errorMessage}">
             <row-span-slot>
               <template v-slot="{ span }">
                 <form-item-col
                   type="password"
                   :value="formData"
                   :error="errorMessage('oldPassword')"
                   :span="24"
                   prop="oldPassword"
                   :namespace="namespace"
                 />
                 <form-item-col
                   type="password"
                   :value="formData"
                   :error="errorMessage('password')"
                   :span="24"
                   prop="password"
                   :namespace="namespace"
                 />
                 <form-item-col
                   type="password"
                   :value="formData"
                   :error="errorMessage('repeatPassword')"
                   :span="24"
                   prop="repeatPassword"
                   :namespace="namespace"
                 />
               </template>
             </row-span-slot>
           </template>
         </cu-form>
       </el-card>
     </el-col>
   </el-row>
  </div>
</template>

<script>
import CuForm from '../../components/CURD/Form/cuFrom'
import {baseApiPostMethod} from '../../components/CURD/baseApi'
import {getData, getMessage, isSuccessResult} from '../../utils/ajaxResultUtil'
import FormItemCol from '../../components/CURD/Form/formItemCol'
import RowSpanSlot from '../../components/CURD/Slot/RowSpanSlot'
export default {
    components: {RowSpanSlot, FormItemCol, CuForm},
    data() {
        const validatePass = (rule, value, callback) => {
            if (this.formData.password && this.formData.repeatPassword) {
                if(this.formData.password.length < 6) {
                    return callback(new Error('密码不少于6个字符'))
                }
                if (this.formData.password === this.formData.repeatPassword) {
                    return callback()
                }
            }
            return callback(new Error('两次密码不一致'))
        };
        return {
            formData: {
                oldPassword: null,
                password: null,
                repeatPassword: null
            },
            formDataRules: {
                oldPassword: [
                    { required: true, message: this.$t('common.oldPasswordNotNull'), trigger: 'blur' }
                ],
                password: [
                    { required: true, message: this.$t('common.passwordNotNull'), trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                repeatPassword: [
                    { required: true, message: this.$t('common.repeatPasswordNotNull'), trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ]
            },
            namespace: 'login'
        }
    },
    methods: {
      doSubmit(data) {
          baseApiPostMethod('/api/resetPassword', data).then(resp => {
              if (isSuccessResult(resp) && getData(resp) === true) {
                  this.$message.success(getMessage(resp))
                  this.$emit('success')
              } else {
                  this.$message.error(getMessage(resp))
              }
          })
      }
    }
}
</script>

<style lang="scss" scoped>

</style>
