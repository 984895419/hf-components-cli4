//package/index.js
// 引入封装好的组件
import ApiSlot from "./Api/ApiSlot.vue"; //插槽Api
//  按钮
import AddBtn from "./Btns/AddBtn.vue"; // 新增
import CommonDialogBtn from "./Btns/CommonDialogBtn.vue"; // 基础弹窗
import DelBtn from "./Btns/DelBtn.vue"; // 删除
import DialogBtnPage from "./Btns/DialogBtnPage.vue"; // 基础弹窗
import DropdownBtn from "./Btns/DropdownBtn.vue"; // 下拉
import ExportBtn from "./Btns/ExportBtn.vue"; // 导出
import TemplateConfirmBtn from './Btns/TemplateConfirmBtn.vue'; // 引入封装好的组件
import UpdateBtn from "./Btns/UpdateBtn.vue"; // 更新
// // developing
import CopyBtn from "./developing/CopyBtn.vue";
import CopyFormItemDict from "./developing/CopyFormItemDict.vue";
// effect

// Form
import cuFrom from "./Form/cuFrom.vue";
import EnableStateformItemText from "./Form/EnableStateformItemText.vue";
import formItemCol from "./Form/formItemCol.vue";
import formItemColDateTime from "./Form/formItemColDateTime.vue";
import formItemColDateTimeRange from "./Form/formItemColDateTimeRange.vue";
import formItemColDict from "./Form/formItemColDict.vue";
import formItemColEnableState from "./Form/formItemColEnableState.vue";
import formItemColRadio from "./Form/formItemColRadio.vue";
import formItemColRandom from "./Form/formItemColRandom.vue"
import formItemColRichText from "./Form/formItemColRichText.vue";
import formItemColSelect from "./Form/formItemColSelect.vue";
import formItemColTextarea from "./Form/formItemColTextarea.vue";
import formItemColUploadImage from "./Form/formItemColUploadImage.vue";
import formItemText from "./Form/formItemText.vue";
// // JsonEditor
import JsonEditor from "./JsonEditor/index.vue";

// Pagination
import CurdPagination from "./pagination/Pagination.vue";
// Query
import SimpleSearch from "./Query/search.vue";

// Slot
import RowSpanSlot from "./Slot/RowSpanSlot.vue";
// Table 
import HfTable from "./Table/HfTable.vue";
import AdaptorTableColumn from "./Table/AdaptorTableColumn.vue";
import EditTable from "./Table/EditTable.vue";
// column base
import DateTimeFormatTableColumn from "./Table/column/base/DateTimeFormatTableColumn.vue";
import SectionTableColumn from "./Table/column/base/SectionTableColumn.vue";
import TagTableColumn from "./Table/column/base/TagTableColumn.vue";
// column other
import CopierRender from "./Table/column/other/CopierRender.vue";
// column 
import CreateTimeTableColumn from "./Table/column/CreateTimeTableColumn.vue";
import CreatorTableColumn from "./Table/column/CreatorTableColumn.vue";
import DefaultTableColumn from "./Table/column/DefaultTableColumn.vue";
import EnableStateTableColumn from "./Table/column/EnableStateTableColumn.vue";
import ImageTableColumn from "./Table/column/ImageTableColumn.vue";
import ModifierTableColumn from "./Table/column/ModifierTableColumn.vue";
import ModifyTimeTableColumn from "./Table/column/ModifyTimeTableColumn.vue";
// select
import TableColumnSelect from "./Table/select/TableColumnSelect.vue";
import baseApi from './baseApi.js'
import curdmixin from './curd.mixin.js'
import defaultUrl from './defaultUrl.js'
import FormItemMixin from './Form/formItem.mixin.js'
// new
// Effect
import HfResizeSplitPane from "./Effect/HfResizeSplitPane.vue";
// Layout 
import FatherSonLayout from "./Layout/FatherSonLayout.vue";
import SimpleTableLayout from "./Layout/SimpleTableLayout.vue";
// Others
import HfTimeline from "./Others/HfTimeline.vue";
import HfTooltip from "./Others/HfTooltip.vue";
//Quit
import QuitCu from "./Quit/QuitCu.vue";
import QuitInputRefer from "./Quit/QuitInputRefer.vue";
import QuitMultipleRefer from "./Quit/QuitMultipleRefer.vue";
//Single
import hfDialog from './Single/hfDialog.vue'
import hfDict from './Single/hfDict.vue'
import hfSelect from './Single/hfSelect.vue'
//table
import DictTableColumn from './Table/column/DictTableColumn.vue'
import SelectTableColumn from './Table/column/SelectTableColumn.vue'



const coms = [
  ApiSlot, AddBtn, CommonDialogBtn,
  DelBtn, DialogBtnPage, DropdownBtn, ExportBtn,
  TemplateConfirmBtn, UpdateBtn, CopyBtn,
  CopyFormItemDict, JsonEditor, CurdPagination, SimpleSearch, RowSpanSlot,
  HfTable, DateTimeFormatTableColumn, SectionTableColumn, TagTableColumn,
  CopierRender, CreateTimeTableColumn, CreatorTableColumn, DefaultTableColumn,
  EnableStateTableColumn, ImageTableColumn, ModifierTableColumn,
  ModifyTimeTableColumn, TableColumnSelect, AdaptorTableColumn,
  cuFrom, EnableStateformItemText, formItemCol, formItemColDict, formItemColDateTime, formItemColDateTimeRange, formItemColUploadImage,
  formItemColEnableState, formItemColRadio, formItemColRichText, formItemColSelect, formItemColTextarea, formItemText, formItemColRandom,
  SimpleTableLayout, FatherSonLayout, HfTimeline, HfTooltip,
  hfDialog, hfDict, hfSelect,
  DictTableColumn, DefaultTableColumn, SelectTableColumn,
  QuitCu, QuitInputRefer, QuitMultipleRefer, HfResizeSplitPane, EditTable
]; // 将来如果有其它组件,都可以写到这个数组里

// 批量组件注册
const install = function (Vue) {
  coms.forEach((com) => {
    Vue.component(com.name, com);
  });
};

export default install
// 这个方法以后再使用的时候可以被use调用
export {
  baseApi,
  curdmixin,
  defaultUrl,
  FormItemMixin
}