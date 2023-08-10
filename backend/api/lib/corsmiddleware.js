import { logData } from './logger'

const allowedList = process.env.ALLOW_CORS_ORIGIN.indexOf(',') !== -1 ? process.env.ALLOW_CORS_ORIGIN.split(',') : process.env.ALLOW_CORS_ORIGIN

export const corsOptions = {
  origin: function (origin, callback) {
    if (origin && origin.indexOf(',') > -1) {
      logData({ groupName: 'corsError-multiorigin', data: { origin } })
      return callback(new Error('Not allowed by CORS'))
    }

    if (allowedList === '*') {
      return callback(null, { origin: true })
    }

    if (Array.isArray(allowedList)) {
      if (!origin || allowedList.some((rx) => new RegExp(rx).test(origin))) {
        return callback(null, { origin: true })
      } else {
        if (origin === 'null') {
          // Added of PG
          return callback(null, { origin: true })
        } else {
          logData({ groupName: 'corsError-array', data: { origin } })
          return callback(new Error('Not allowed by CORS'))
        }
      }
    }

    if (typeof allowedList === 'string') {
      if (!origin || allowedList === origin) {
        return callback(null, { origin: allowedList })
      } else {
        logData({ groupName: 'corsError-string', data: { origin } })
        return callback(new Error('Not allowed by CORS'))
      }
    }
  },
  maxAge: process.env.MAX_CORS_AGE_IN_SEC || 600
}
