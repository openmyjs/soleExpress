import fse from 'fs-extra'

import { type Express } from 'express'

import { stores, StoresKey } from '@/stores'

import hjson from 'hjson'

import { isCluster } from '@/utils/cluster'

export default (app: Express): Promise<StoresKey['config']> => {
  return new Promise((resolve, reject) => {
    try {
      const env: 'development' | 'production' = app.get('env')

      //eslint-disable-next-line no-console
      console.log('当前模式', env)

      const configPath = env === 'development' ? './src/deploy/devApp.conf' : './conf/app.conf'

      const config = fse.readFileSync(configPath, 'utf8')

      const tohjson = hjson.parse(config)

      stores.set('config', tohjson, true)

      isCluster(tohjson.cluster, () => {
        resolve(tohjson)
      })
    } catch (error) {
      reject(error)
    }
  })
}
