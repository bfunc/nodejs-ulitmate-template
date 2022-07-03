import { version } from '../package.json'

const config = Object.freeze({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
  version: process.env.APP_VERSION || version,
  env: process.env.NODE_ENV,
  isDev:
    typeof process.env.NODE_ENV === 'undefined' ||
    process.env.NODE_ENV === 'development',
})

export type Config = typeof config
export default () => config
