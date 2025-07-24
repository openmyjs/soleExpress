interface FlatArrayToCascadeOptions {
  keyField?: string
  delimiter?: string
  formatting?: (item: any, levelKeys?: any, index?: any, isLeaf?: any) => any
  childrenField?: string
  sortByName?: string
}
/**
 * 将扁平数据转换为级联结构
 * 一般用于处理菜单数据和级联数据
 * @param {Array} data - 原始数据数组
 * @param {Object} options - 配置选项
 * @param {String} options.keyField - 用于级联的键字段名
 * @param {String} options.delimiter - 键的分隔符 或是输入array 表示输入是数组
 * @param {Function} options.formatting - 节点格式化函数，自定义节点数据
 * @param {String} options.childrenField - 子节点字段名
 * @param {String} options.sortByName - <格式化后字段名字> 根据指定字段排序(formatting 格式化后字段)
 * @returns {Array} 转换后的级联数据
 */

export function flatArrayToCascade(data: any[], options: FlatArrayToCascadeOptions) {
  const {
    keyField = 'key',
    delimiter = ',',
    formatting = (item) => ({
      ...item // 保留原始数据
    }),
    childrenField = 'children'
  } = options

  const root = { [childrenField]: [] }

  const nodeMap = new Map()

  // 处理每个数据项
  data.forEach((item) => {
    const keys = delimiter !== 'array' ? item[keyField].split(delimiter) : item[keyField]

    let parent = root

    keys.forEach((_key: any, index: number) => {
      const levelKeys = keys.slice(0, index + 1)

      const nodeKey = levelKeys.join(delimiter)

      const isLeaf = index === keys.length - 1

      // 检查节点是否已存在
      let node = nodeMap.get(nodeKey)

      if (!node) {
        // 创建新节点
        node = {
          ...formatting(item, levelKeys, index, isLeaf),
          [childrenField]: []
        }
        nodeMap.set(nodeKey, node)
        parent[childrenField].push(node)
      }

      // 更新父节点
      parent = node
    })
  })

  // 对结果进行排序（如果需要）
  if (options.sortByName) {
    root[childrenField].sort((a, b) => a[options.sortByName] - b[options.sortByName])
  }

  return root[childrenField]
}
