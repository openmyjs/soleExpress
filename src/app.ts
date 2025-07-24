import * as bodyParser from 'body-parser'

import express from 'express'

import logger from 'morgan'

import { cors, createLog, limiter, verifyToken, errorHandler, validateRoute, RouteParseToken } from './middleware'

import autoload from 'express-automatic-routes'

import deploy from './deploy'

import { createConnection } from './database'

// import { SshPortForwarder } from '@/utils/ssh'
const app = express()

/** 项目启动前置统一方法*/
deploy(app).then((res: any) => {
  const { server, db: dbInfo } = res

  const { port, tokenSecret } = server

  // 设置trust proxy 如果使用nginx  这是必须的
  app.set('trust proxy', true)

  /** 跨域 */
  app.use(cors())

  /**  应用 请求限流 中间件 */
  app.use(limiter())

  // 使用 body-parser 中间件来解析 JSON 请求体
  app.use(bodyParser.json())

  /** 验证路由是否存在 */
  app.use(validateRoute)

  /** 验证token */
  app.use(verifyToken(tokenSecret))

  /** 解析token*/
  app.use(RouteParseToken)

  /** 创建日志 使用 日志 中间件 */
  app.use(createLog) // 记录访问日志

  /** 处理 错误 中间件 */
  app.use(errorHandler)

  /** 打印到控制台  */
  app.use(logger('dev'))

  app.listen(port, () => {
    //eslint-disable-next-line no-console
    console.log(`Server is running at http://localhost:${port}`)
  })

  /** 自动注册路由 */
  autoload(app, { dir: './routes' })

  /** 启动数据库 */
  createConnection('mongo_1', dbInfo.mongo.url, dbInfo.mongo.options).then()
})
