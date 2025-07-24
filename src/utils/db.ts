type Page = number | string
interface PaginationRuns {
  pageLimit: number
  pageSkip: number
}

/**
 * [服务端] 获取分页 页码处理
 * @param pageNum 页码
 * @param pageSize 每页数量
 * @returns {pageLimit: number, pageSkip: number}
 * */
export const pagination = (pageNum: Page, pageSize: Page): PaginationRuns => {
  // 2. 转换为数字类型
  const page = parseInt(String(pageNum), 10)

  const limit = parseInt(String(pageSize), 10)

  // page = Math.max(1, page)

  // 3. 计算跳过的文档数量
  const skipCount = (page - 1) * limit

  return {
    pageLimit: limit,
    pageSkip: skipCount
  }
}
