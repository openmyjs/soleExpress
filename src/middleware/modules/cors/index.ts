import cors from 'cors'

import { stores } from '@/stores'

export default function () {
  // 配置 CORS
  const allowedOrigins: string[] = stores.get('config').cors

  const corsOptions = {
    origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void): void {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    optionsSuccessStatus: 200, // 某些旧浏览器需要这个
    methods: 'GET,POST,PUT,DELETE',
    // allowedHeaders: ['Content-Type', 'Authorization']
    allowedHeaders: 'Content-Type,Authorization'
  }

  return cors(corsOptions)
}
