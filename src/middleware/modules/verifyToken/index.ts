import expressjwt from 'express-jwt'

import { Request } from 'express'

import exclude from './exclude'

type HeadersTokenName = 'authorization' | 'Token'
const headersTokenName: HeadersTokenName = 'authorization'

export default (secret: string) => {
  return expressjwt({
    secret: secret,
    algorithms: ['HS256'],
    requestProperty: 'auth',
    getToken: (req: Request) => {
      // 默认从请求头的 Authorization 字段中提取 JWT
      // if (typeof req.headers[headersTokenName] === 'string') {
      //   return req.headers[headersTokenName]?.split(' ')[1]
      // }
      const authHeader = req.get(headersTokenName)

      if (authHeader && typeof authHeader === 'string') {
        return authHeader.split(' ')[1]
      }

      return null
    }
  }).unless({
    // 不需要验证token的接口
    path: exclude,
    useOriginalUrl: true // 确保匹配原始URL
  })
}
