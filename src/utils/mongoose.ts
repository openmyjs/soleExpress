import { getConnection } from '@/database'

import mongoose, { Model, Schema, SchemaDefinition } from 'mongoose'

interface Params {
  /** cn: map 缓存 模型
   * en: map cache model
   * */
  modelCache: Map<string, Schema>
  /**
   * cn: map 缓存中的 key ,任意值即可,不可以是随机值
   * en: map cache key, any value can be used, cannot be a random value
   * */
  cacheKey: string
  /**
   * cn:数据库连接名
   * en: database connection name
   * */
  connectionName: string
  /**
   * cn: 需要操作的集合名称
   * en: collection name
   * */
  collection: string
  /**
   * cn: 模型定义 data
   * en: model definition data
   * */
  schema: SchemaDefinition
  /**
   * cn: 模型扩展
   * en: model extension
   *
   * */
  extension?: (schema: Schema) => void
}

/**
 * cn: 创建模型
 * en: Create model
 * */
export function createModel(params: Params): Model<any> {
  const { modelCache, cacheKey, connectionName, collection, schema, extension } = params

  const connection = getConnection(connectionName)

  if (!connection) {
    throw new Error(`连接 ${connectionName} 不存在`)
  }

  // 如果缓存中已有该模型，直接返回
  if (modelCache.has(cacheKey)) {
    return connection.model(collection, modelCache.get(cacheKey))
  }

  const mySchema: Schema = new mongoose.Schema(schema, {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      }
    }
  })

  if (typeof extension === 'function') {
    extension(mySchema)
  }

  // 缓存模型
  modelCache.set(cacheKey, mySchema)

  // 导出模型
  return connection.model(collection, mySchema)
}
