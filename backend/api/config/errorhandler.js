import util from 'util'
// import { httpStatus } from '../constants'
import { logError } from '../lib/logger'

const log = util.debuglog('App')

export const errorHandler = (err, req, res, next) => {
  err.status && err.status === '404' ? log(err.toString()) : logError({ err, groupName: 'ErrorHandler' })
}
