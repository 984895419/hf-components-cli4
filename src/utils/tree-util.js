import { isEmpty } from 'element-ui/src/utils/util'
export function expendnode(that, treeSelected, sonId, parentId) {
  that.$refs.tree.store.nodesMap[treeSelected[sonId]].expanded = true
  if (!isEmpty(treeSelected[parentId])) {
    expendnode(that, that.$refs.tree.getNode(treeSelected[parentId]).data, sonId, parentId)
  }
}
