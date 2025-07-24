import fs from 'node:fs'

import path from 'node:path'

import dayjs from 'dayjs'

import morgan from 'morgan'

import express from 'express'

const app = express()

const getMode = app.get('env')

const logDirectory = getMode === 'development' ? 'src/logs' : 'logs'

// const logDirectory = path.join(process.cwd(), 'src/logs', 'access')
// const logDirectory = path.join(process.env?.PATH_SRC, 'logs', 'access');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// 创建按时间格式命名的写入流
let accessLogStream: any = fs.createWriteStream(path.join(logDirectory, `${dayjs().format('YYYY-MM-DD')}.log`), {
  flags: 'a'
})

// 自定义格式函数
const customFormat = (tokens: any, request: any, res: any): string => {
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss')

  const fileName = `${dayjs().format('YYYY-MM-DD')}.log` // 使用时间格式作为日志文件名

  // 如果当天的日志文件流不存在，则创建
  if (!accessLogStream || accessLogStream.fileName !== fileName) {
    accessLogStream = fs.createWriteStream(path.join(logDirectory, fileName), { flags: 'a' })

    accessLogStream.fileName = fileName
  }

  // 获取请求参数并加入日志
  const requestPath = request.path

  // return `${time} ${tokens.method(request, res)} ${requestPath} ${tokens.status(request, res)} - ${tokens.res(request, res, 'content-length')} - ${tokens['response-time'](request, res)}ms - ${fileName} - Query Params: ${queryParameters}  - Body Params: ${bodyParameters}`

  const data = {
    time: time,
    ip: request.ip,
    method: tokens.method(request, res),
    path: requestPath,
    query: JSON.stringify(request.query),
    body: JSON.stringify(request.body)
  }

  return Object.values(data).join(' ')
}

// // 导出日志中间件
// module.exports = {
//     accessLogMiddlewares:
// };

export default morgan(customFormat, { stream: accessLogStream })
