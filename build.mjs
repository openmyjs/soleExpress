import fse from 'fs-extra'

import { exec } from 'child_process'

/**
 * 构建目录
 * */
const tscFolder = './dist'

/**
 * 需要拷贝的文件列表
 * */
const copyList = ['package.json', 'package-lock.json', 'src/conf']

// 执行 npm 构建脚本
exec('npm run clean && npm run tsc-build', async (error, _stdout, _stderr) => {
  if (error) {
    //eslint-disable-next-line no-console
    console.error(`npm run clean&& npm run tsc-build: ${error.message}`)
  }

  copyList.forEach((item) => {
    fse.copy(item, `${tscFolder}/${item.split('/').pop()}`, { overwrite: true }, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    })
  })
})
