import pino from 'pino'
export type Logger = {
  info: <T>(obj: T, msg?: string) => void
  warn: <T>(obj: T, msg?: string) => void
  error: <T>(obj: T, msg?: string) => void
}
export default () => pino()
