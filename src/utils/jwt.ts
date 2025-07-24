import jwt from 'jsonwebtoken'

import { stores } from '@/stores'
// 配置密钥和选项

// 定义 JWT 载荷接口
interface JwtPayload {
  uid: string
  username: string
  role: []
}

// 生成 JWT
export const generateToken = (payload: JwtPayload, remember: boolean): string => {
  const { tokenSecret, tokenExpire } = stores.get('config').server

  const SECRET_KEY = tokenSecret

  const EXPIRATION = tokenExpire.expiresIn

  const rememberMe = tokenExpire.expiresInMe

  const tokenExpiration = remember ? rememberMe : EXPIRATION

  return jwt.sign(payload, SECRET_KEY, { expiresIn: tokenExpiration, algorithm: 'HS256' })
}

// 验证 JWT
export const verifyToken = (token: string): JwtPayload | null => {
  const SECRET_KEY = stores.get('config').server.tokenSecret // 实际应用中应从环境变量获取

  try {
    return jwt.verify(token, SECRET_KEY) as JwtPayload
  } catch (_error) {
    return null
  }
}

// 解析 JWT (不验证签名)
export const decodeToken = (token: string): JwtPayload | null => {
  return jwt.decode(token) as JwtPayload | null
}
