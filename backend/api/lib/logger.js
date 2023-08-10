import util from 'util'

const logger = util.debuglog('logger')

export const logAxiosError = ({ err, groupName = 'logAxiosError' }) => {
  logger(JSON.stringify({ groupName, err: JSON.stringify(err) }))
}

export const logError = ({ err = 'logError', groupName = 'logError', message = null }) => {
  const params = { groupName, errorMessage: err.toString(), stack: err.stack || err, code: err.code || '', userMessage: message }
  logger(JSON.stringify(params))
}

export const logData = ({ data = {}, groupName = 'logData', message = null }) => {
  const params = { groupName, data, message }
  logger(JSON.stringify(params))
}
