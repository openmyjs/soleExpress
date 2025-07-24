# 删除集合索引 示例
## 示例解释
| name        | remark   |
| ----------- | -------- |
| {menu}      | 集合名称 |
| {indexName} | 索引名称 |

``` typescript
const MyModel = mongoose.model(`{ menu }`, mySchema)
MyModel.collection.dropIndex(`{indexName}`, function (err, result) {
  if (err) {
    console.error('Error dropping index:', err)
    return
  }
  console.log('Index dropped successfully')
})
```
