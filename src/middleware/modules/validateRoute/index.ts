import { NextFunction, Request, Response } from 'express'

export default function (req: Request, res: Response, next: NextFunction): void {
  try {
    // console.log('path', req)
    // 验证逻辑...
    const routeExists = req.app._router.stack.some((layer: any) => {
      if (layer.route && layer.route.path === req.path) {
        return layer.route.methods[req.method.toLowerCase()]
      }

      return false
    })

    if (!routeExists) {
      res.status(404).json({
        message: '您访问的api路径不存在...',
        status: '404 Not Found',
        path: req.originalUrl // 可选：包含请求的原始 URL，以便调试
      })

      return
    }

    next()
  } catch (_err) {
    // 确保错误处理安全
    // next(err instanceof Error ? err : new Error(String(err)));
  }
}
