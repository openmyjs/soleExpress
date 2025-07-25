const map: Map<keyof KeyType, ValueType[keyof KeyType]> = new Map()

const protectedKeys: Set<keyof KeyType> = new Set() // 存储受保护的键

export interface KeyType {
  config: string
}

export interface ValueType {
  config: {
    /**  是否CPU集群配置 */
    cluster: boolean
    /** 服务配置 */
    server: {
      /**
       * 端口
       * */
      port: number
      /**
       * 密钥
       * */
      tokenSecret: string
      /**
       * 密钥过期时间
       * */
      tokenExpire: {
        /**
         * 密钥过期时间
         * */
        expiresIn: string
        /**
         * 记住我秘钥过期时间
         * */
        expiresInMe: string
      }
    }
    /** 数据库配置 */
    db: {
      mongo: {
        uri: string
        options: any
      }
    }
    /** CORS 配置 */
    cors: string[]
  }
}

interface Stores {
  /**
   * set
   * @param  key 键
   * @param  value 值
   * @param protect en:Whether to protect, to prevent overwriting the protected value zh:是否保护,防止覆盖需要保护的值
   * */
  set<K extends keyof KeyType>(key: K, value: ValueType[K], protect?: boolean): boolean

  /**
   * get
   * @param  key 键
   * */
  get<K extends keyof KeyType>(key: K): ValueType[K] | undefined

  /**
   * delete
   * @param  key 键
   * */
  del<K extends keyof KeyType>(key: K): boolean
}

export const stores: Stores = {
  set: (key, value, protect = false): boolean => {
    // zh 如果是受保护的键，不允许修改
    // en If the key is protected, it is not allowed to modify
    if (protectedKeys.has(key)) {
      // eslint-disable-next-line no-console
      console.error(`Key "${key}" is protected and cannot be modified.`)

      return false
    }

    map.set(key, value)

    if (protect) {
      protectedKeys.add(key)
    }

    return true
  },
  get: (key) => map.get(key),
  del: (key) => {
    if (protectedKeys.has(key)) return false

    return map.delete(key)
  }
}
