<template>
  <common-dialog-btn title="从控制器导入" :type="type" label="从控制器导入">
    <template v-slot="{ closeDialog }">
      <base-handler-mapping-controller-multiple-refer v-model="selectROW" @success="doEnsure(closeDialog)" />
    </template>
  </common-dialog-btn>
</template>

<script>
    import * as conf from './api'
    import CommonDialogBtn from '../../../components/CURD/Btns/CommonDialogBtn'
    import BaseHandlerMappingControllerMultipleRefer from '../baseHandlerMappingController/multipleRefer'
    import { baseApiPostMethod } from '../../../components/CURD/baseApi'
    import { getMessage, isSuccessResult } from '../../../utils/ajaxResultUtil'
    /**
     * 从控制器模块导入
     */
    export default {
        name: 'ImportFromController',
        components: { BaseHandlerMappingControllerMultipleRefer, CommonDialogBtn },
        props: {
            menuId: [Object, Number],
            type: {
                type: String,
                default: 'primary'
            }
        },
        data() {
          return {
              importFromControllerUrl: conf.urlMethods.importFromControllerUrl,
              selectROW: null
          }
        },
        methods: {
            doEnsure(closeDialog) {
                baseApiPostMethod(this.importFromControllerUrl, {
                    menuId: this.menuId,
                    controllerIds: this.selectROW.map(t => t.controllerId)
                }).then(resp => {
                    if (isSuccessResult(resp)) {
                        this.$message.success(getMessage(resp))
                        this.$emit('success')
                        if (closeDialog) {
                            closeDialog()
                        }
                    } else {
                        this.$message.error(getMessage(resp))
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
