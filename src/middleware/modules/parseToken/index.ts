// 已经有expressjwt为什么要有这个功能?
// 1.expressjwt/unless/path设定不需要token的路由,就不会执行解析token了,
// 2.业务逻辑中路由 如果出现开放API需要根据用户是否登录进行加载用户相关的数据
/** 路由解析token
 * */
import { NextFunction, Request, Response } from 'express'

import { verifyToken } from '@/utils/jwt'

interface Requests extends Request {
  auth?: any
}

export default function (req: Requests, res: Response, next: NextFunction): void {
  try {
    if (!req.auth) {
      const token = req.headers.authorization?.split(' ')[1]

      if (token) {
        req.auth = verifyToken(token) //手动附加用户信息
      }
    }

    next()
  } catch (err) {
    next(err)
  }
}
