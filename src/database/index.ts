import mongoose, { ConnectOptions, type Connection } from 'mongoose'

// 存储已连接的数据库实例
const connections = new Map()

/**
 * 创建并返回一个数据库连接
 * @param {string} name - 数据库连接名称
 * @param {string} uri - 数据库连接 URI
 * @param {object} options - 连接选项
 */
export async function createConnection(name: string, uri: string, options: ConnectOptions) {
  try {
    if (connections.has(name)) {
      return connections.get(name)
    }

    const connection: Connection = mongoose.createConnection(uri, {
      ...options
    })

    // 监听连接事件
    connection.on('connected', () => {
      //eslint-disable-next-line no-console
      console.log(`[DB] ${name} 连接成功`)
    })

    connection.on('error', (_err) => {
      //eslint-disable-next-line no-console
      console.error(`[DB] ${name} 连接错误:`)
      setTimeout(async () => {
        await createConnection(name, uri, options)
      }, 5000)
    })

    connection.on('disconnected', () => {
      //eslint-disable-next-line no-console
      console.log(`[DB] ${name} 断开连接`)
      setTimeout(async () => {
        await createConnection(name, uri, options)
      }, 5000)
    })

    // 存储连接实例
    connections.set(name, connection)

    // 等待连接成功
    await connection.asPromise()

    return connection
  } catch (_error) {
    setTimeout(async () => {
      await createConnection(name, uri, options)
    }, 5000)
  }
}

/**
 * 获取已存在的数据库连接
 * @param {string} name - 数据库连接名称
 * @returns {mongoose.Connection | undefined}
 */
export function getConnection(name: string): mongoose.Connection | undefined {
  return connections.get(name)
}

/**
 * 关闭所有数据库连接
 *
 */
export async function closeAllConnections(): Promise<void> {
  const closePromises = Array.from(connections.values()).map((conn) => conn.close())

  await Promise.all(closePromises)
  connections.clear()
}
