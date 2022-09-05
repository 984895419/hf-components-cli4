<template>
  <add-btn :init-data="value" :label="btnLabel" :type="btnType" :show-icon="showIcon">
    <template v-slot="{ closeDialog, data }">
      <cu-form :namespace="conf.namespace" :value="data" :action-method="addUrl" :form-rules="formRules" v-on="$listeners" @closeDialog="closeDialog">
        <template v-slot="{ errorMessage }">
          <row-span-slot>
            <template v-slot="{ span }">
              <!-- 新增的的字段配置 -->
              <form-item-col
                :value="data"
                :error="errorMessage('menuAlias')"
                :span="span"
                prop="menuAlias"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('menuName')"
                :span="span"
                prop="menuName"
                :namespace="conf.namespace"
              />
              <form-item-col-dict
                :value="data"
                :error="errorMessage('menuType')"
                :span="span"
                prop="menuType"
                :dict-code="'MENU_TYPE'"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('i18nMenuName')"
                :span="span"
                prop="i18nMenuName"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('icon')"
                :span="span"
                prop="icon"
                :namespace="conf.namespace"
              />
              <form-item-col
                v-if="data.menuType === 'ENDING_MENU'"
                :value="data"
                :error="errorMessage('component')"
                :span="span"
                prop="component"
                :namespace="conf.namespace"
              />
              <form-item-col
                v-if="data.menuType === 'ENDING_MENU'"
                :value="data"
                :error="errorMessage('controllerId')"
                :span="span"
                prop="controllerId"
                :namespace="conf.namespace"
              >
                <base-handler-mapping-controller-input-refer
                  :value="data"
                  value-refer-id="controllerId"
                  value-refer-name="controllerName"/>
              </form-item-col>
              <form-item-col
                :value="data"
                :error="errorMessage('sort')"
                :span="span"
                prop="sort"
                :namespace="conf.namespace"
              />
              <form-item-col-enable-state
                :value="data"
                :span="span"
                :namespace="conf.namespace"
              />
              <form-item-col
                :value="data"
                :error="errorMessage('parentId')"
                :span="span"
                prop="parentId"
                :namespace="conf.namespace"
              >
                <hf-base-right-menu-input-refer
                  :value="data"
                  :value-refer-id="'parentId'"
                  :value-refer-name="'parentName'"
                />
              </form-item-col>
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
          </row-span-slot>
        </template>
      </cu-form>
    </template>
  </add-btn>
</template>

<script>
    import * as conf from './api'
    import AddBtn from '@/components/CURD/Btns/AddBtn'
    import CuForm from '@/components/CURD/Form/cuFrom'
    import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot'
    import FormItemCol from '@/components/CURD/Form/formItemCol'
    import FormItemColDict from '@/components/CURD/Form/formItemColDict'
    import { baseApiPostMethod } from '@/components/CURD/baseApi'
    import FormItemColEnableState from '@/components/CURD/Form/formItemColEnableState'
    import HfBaseRightMenuInputRefer from './inputRefer'
    import BaseHandlerMappingControllerInputRefer from '@/views/basic/baseHandlerMappingController/inputRefer'
    export default {
        name: 'HfBaseRightMenuAdd',
        components: {BaseHandlerMappingControllerInputRefer, FormItemColDict, FormItemCol, RowSpanSlot, CuForm, AddBtn, FormItemColEnableState, HfBaseRightMenuInputRefer },
        props: {
            value: {
                type: Object,
                default: function() {
                    return { enableState: 1 }
                }
            },
            actionUrl: String,
            /**
             * 按钮名称
             */
            btnLabel: String,
            btnType: String,
            showIcon: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                conf: conf,
                formRules: null
            }
        },
        computed: {
            addUrl() {
              return (data) => {
                  return baseApiPostMethod(this.actionUrl, data)
              }
            }
        },
        created() {
          this.formRules = conf.formRules(this)
        }
    }
</script>

<style scoped>

</style>
