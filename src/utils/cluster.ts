import cluster from 'cluster'

import { cpus } from 'os'

/**
 * cpu集群模式
 * */
export function isCluster(sign: boolean = false, callback: () => void) {
  if (!sign) {
    return callback()
  }

  // 检查是否为主进程
  if (cluster.isPrimary) {
    const numCPUs = cpus().length

    // eslint-disable-next-line no-console
    console.log(`主进程 ${process.pid} 正在运行，创建 ${numCPUs} 个工作进程`)

    // 创建工作进程
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
    }

    // 监听工作进程事件
    cluster.on('exit', (worker, code, _signal) => {
      // eslint-disable-next-line no-console
      console.log(`工作进程 ${worker.process.pid} 退出，代码: ${code}`)
      cluster.fork() // 自动重启
    })
  } else {
    if (typeof callback === 'function') {
      callback()
    }
  }
}
