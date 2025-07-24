import rateLimit from 'express-rate-limit'

export default function () {
  return rateLimit({
    windowMs: 30 * 1000, // 30秒
    limit: 500, // 将每个 IP 限制为每个“窗口”（此处为每 30秒）100 个请求。
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` 标头；draft-7：组合的 `RateLimit` 标头
    legacyHeaders: false, // 禁用 `X-RateLimit-*` 标头。
    // store: ... , // Redis、Memcached 等。见下文。
    keyGenerator: (req) => {
      // 获取最左侧的 IP（最接近客户端的 IP）
      // console.log(req.ips)

      return req.ips[0] || req.ip // req.ips 需要 trust proxy 配置正确
    },
    handler: (_req, res) => {
      res.status(429).json({ code: 429, msg: '同时请求太多，请等待一分钟再进行操作' })
    }
  })
}
