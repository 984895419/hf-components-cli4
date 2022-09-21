<template>
  <component :is="componentBtn" :init-data="initValue" v-bind="componentAttrs">
    <template v-slot="{ closeDialog, data }">
      <cu-form
        :namespace="conf.namespace"
        :value="data"
        :action-method="actionMethod"
        :form-rules="formRules"
        v-on="$listeners"
        @closeDialog="closeDialog"
      >
        <template v-slot="{ errorMessage }">
          <row-span-slot>
            <template v-slot="{ span }">
              <!-- 新增的的字段配置 -->
              <slot :span="span" :errorMessage="errorMessage" :data="data" :closeDialog="closeDialog" />
            </template>
          </row-span-slot>
        </template>
        <template #add-btn-before="{ formValidate }">
          <slot name="add-btn-before" :data="data" :formValidate="formValidate" />
        </template>
      </cu-form>
    </template>
  </component>
</template>

<script>
import { mapGetters } from 'vuex'
import CurdMixin from '../curd.mixin'
import { baseApiPostMethod, baseApiPutMethod } from '../baseApi'
export default {
  name: 'QuitCu',
  mixins: [CurdMixin],
  props: {
    value: {
      type: Object,
      default: function() {
        return { enableState: 1, compositions: [] }
      }
    },
    conf: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formRules: null
    }
  },
  computed: {
    ...mapGetters([
      'tenantId'
    ]),
    existId() {
      return this.value[this.conf.primaryKeyField]
    },
    initValue() {
      return this.existId ? undefined : this.value
    },
    actionMethod() {
      return (data) => {
        if (this.existId) {
          return baseApiPutMethod(this.templateUrl(this.conf.urlMethods.updateUrl, data), data)
        } else {
          return baseApiPostMethod(this.conf.urlMethods.addUrl, data)
        }
      }
    },
    /**
     * 主键按钮的类型
     */
    componentBtn() {
      // 如果主键的值存在，则为修改，否则为新增
      if (this.existId) {
        return 'update-btn'
      } else {
        return 'add-btn'
      }
    },
    /**
     * componentAttrs的属性
     */
    componentAttrs() {
      // 如果主键的值存在，则为修改，否则为新增
      if (this.existId) {
        return {
          type: 'text',
          url: this.templateUrl(this.conf.urlMethods.queryUrl, this.value)
        }
      } else {
        return {}
      }
    }
  },
  created() {
    this.formRules = this.conf.formRules(this)
  }
}
</script>

