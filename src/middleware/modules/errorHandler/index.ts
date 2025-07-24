import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

type ErrType = ErrorRequestHandler & { message: any; code: any }

export default function (err: ErrType, _req: Request, res: Response, _next: NextFunction): void {
  switch (err.name) {
    /**  处理 JWT 验证错误  token 报错信息 */
    case 'UnauthorizedError': {
      // token验证失败
      return JW_TERROR(err, res)
    }

    case 'ValidationError': // mongoose 验证错误  重新截取错误信息 让前端提示信息更友好 /** 指向的报错字段 [min,max]*/
      const customMessage = err.message.replace(/^.*?validation failed:.*?:\s*/, '')

      res.status(400).json({
        error: 'ValidationFailed',
        message: customMessage
      })

      return

    /**
     * mongoose 指向的报错字段 [unique,]
     * */
    case 'MongooseError':
      res.status(400).json({
        error: 'MongooseError',
        message: err.message
      })

      return
    default:
      res.status(500).json({
        error: err.name,
        message: err.message
      })

      return
  }
}

function JW_TERROR(err: ErrType, res: Response) {
  switch (err.code) {
    case 'invalid_token':
      // Token 无效（签名错误、格式错误等）
      res.status(401).json({
        error: '无效的 Token',
        message: err.message
      })

      return

    case 'credentials_required':
      // 没有提供 Token
      res.status(401).json({
        error: '缺少 Token',
        message: '请求需要身份验证，请提供 Token'
      })

      return

    case 'token_expired':
      // Token 过期
      res.status(401).json({
        error: 'Token 已过期',
        message: '请重新登录获取新的 Token'
      })

      return

    default:
      // 其他 JWT 错误
      res.status(401).json({
        error: '认证失败',
        message: err.message
      })

      return
  }
}
