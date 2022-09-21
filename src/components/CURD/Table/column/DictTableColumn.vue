<template>
    <div>
        <el-table-column :prop="prop" :label="($attrs && $attrs.label) || $t(namespace + '.' + prop)" v-bind="$attrs"
            :align="align">
            <template slot-scope="scope">
                <slot v-if="scope.row.editable !== undefined">
                    <el-form-item :rules="computeRules" :prop="pathName && pathName + '.' + scope.$index + '.' + prop"
                        :required="required"
                        :error="errorMessage ? errorMessage('compositions[' +scope.$index+'].' + prop) : undefined">
                        <div v-show="scope.row.editable">
                            <slot name="othertype">
                                <hf-tooltip :namespace="namespace" :prop="prop">
                                    <template v-slot="{placeholder}">
                                        <hf-dict :namespace="namespace" v-bind="$attrs" :value="scope.row" :prop="prop"
                                            v-on="$listeners" :placeholder="placeholder" @change="change(scope.row)"
                                            ref="dict" />
                                    </template>
                                </hf-tooltip>
                            </slot>
                        </div>
                        <copier-render v-if="!scope.row.editable" :copyable="copyable" :prop="copyProps "
                            :row="scope.row" :max-words="maxWords" />
                    </el-form-item>
                </slot>
                <slot v-else>
                    <copier-render :copyable="copyable" :prop="copyProps " :row="scope.row" :max-words="maxWords" />
                </slot>
            </template>
        </el-table-column>
    </div>
</template>
  
<script>
import CopierRender from './other/CopierRender'
import { mapGetters } from 'vuex'
export default {
    name: 'DictTableColumn',
    components: { CopierRender },
    props: {
        copyable: {
            type: Boolean,
            default: false
        },
        namespace: {
            type: String
        },
        align: {
            type: String
        },
        prop: {
            type: String
        },
        maxWords: {
            type: Number,
            default: 27
        },
        required: {
            type: Boolean,
            default: false
        },
        pathName: {
            type: String,
            default: undefined
        },
        errorMessage: {
            type: Function
        },
        propName: {
            type: String,
            default: undefined
        }
    },
    computed: {
        ...mapGetters([
            'size'
        ]),
        computeRules() {
            if (this.$attrs.rules) {
                return this.$attrs.rules
            }
            if (this.required) {
                return [{
                    required: true,
                    message: this.$t(this.namespace + '.' + this.prop) + this.$t('common.notEmpty'),
                    trigger: 'blur'
                }]
            } else {
                return []
            }
        },
        copyProps() {
            return this.propName || this.prop + 'Name'
        }
    },
    methods: {
        change(row) {
            this.$nextTick(() => {
                row[this.copyProps] = this.$refs.dict.changeItem(row[this.prop])
            })
        }
    }
}
</script>
  
<style scoped lang="less">
/deep/ .el-form-item__content {
    margin-left: 0 !important;
}
</style>
  