function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export default {
  data() {
    return {
      elWidth: 0,
      elHeight: 0
    }
  },
  computed: {
    /**
     * 模板化url
     * @returns {(function(*, *): (*))|*}
     */
    templateUrl() {
      return (url, data) => {
        if (data) {
          const regex = /{([a-zA-Z0-9]+)}/
          let res = url
          if (Array.isArray(data)) {
            // 集合对象// 单个对象
            let attr = null
            while ((attr = regex.exec(res)) != null) {
              res = res.replace(attr[0], data.map(s => s[attr[1]]).join(','))
            }
          } else {
            // 单个对象
            let attr = null
            while ((attr = regex.exec(res)) != null) {
              res = res.replace(attr[0], data[attr[1]])
            }
          }
          return res
        }
        return url
      }
    },
    /**
     * 用来查询是否有分组信息
     */
    groupLength() {
      return (addFields) => {
        const groups = []
        const defaultGroup = '其他信息'
        addFields.forEach(t => {
          let group
          if (t.belongGroup) {
            if (isString(t.belongGroup)) {
              group = t.belongGroup
            } else {
              group = t.belongGroup.name
            }
          }
          group = group || defaultGroup
          if (groups.indexOf(group) < 0) {
            groups.push(group)
          }
        })
        return groups.length
      }
    },
    /**
     * 分组和字段的显示
     */
    groupFields() {
      return (addFields) => {
        const groupsMap = {}
        const groupSort = {}
        addFields.filter(t => t.belongGroup).forEach(t => {
          let group
          if (t.belongGroup) {
            if (isString(t.belongGroup)) {
              group = t.belongGroup
              groupSort[group] = 999
            } else {
              group = t.belongGroup.name
              groupSort[group] = t.belongGroup.sort || 999
            }
          }
          if (groupsMap[group] == null) {
            groupsMap[group] = {
              name: group,
              fields: [t]
            }
          } else {
            groupsMap[group].fields.push(t)
          }
        })
        const groups = []
        for (const ind in groupsMap) {
          groups.push(groupsMap[ind])
        }
        groups.sort((a, b) => {
          return groupSort[a.name] - groupSort[b.name]
        })
        return groups
      }
    },

    /**
     * 分组和字段的显示
     */
    emptyGroupFields() {
      return (addFields) => {
        return addFields.filter(t => !(t.belongGroup))
      }
    }
  },
  created() {
    this.calculateWidthAndHeight()
    window.onresize = this.calculateWidthAndHeight
  },
  methods: {
    calculateWidthAndHeight() {
      this.elWidth = (this.$el && this.$el.getBoundingClientRect().width)
      this.elHeight = (this.$el && this.$el.getBoundingClientRect().height)
    }
  }
}
