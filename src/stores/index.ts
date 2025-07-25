const map: Map<KeyType, ValueType> = new Map()

export interface KeyType {
  config:string
}
export interface ValueType {
  config:{
    /**  是否CPU集群配置 */
    cluster: boolean
    /** 服务配置 */
    server:{
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
    db:{
      mongo:{
        uri: string
        options: any
      }
    }
    /** CORS 配置 */
    cors: string[]
  }
}

export const stores:Map<KeyType, ValueType> = map
