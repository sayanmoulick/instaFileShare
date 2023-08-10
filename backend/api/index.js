import express from 'express'
import helmet from 'helmet'
import { Router } from './routes'
import { AppError } from './lib/apperror'
import { httpStatus } from './constants'
import { errorHandler } from './config' // import { mysqlConnect, pgsqlConnect } from './config'
import cors from 'cors'
import { corsOptions } from './lib/corsmiddleware'
const { join } = require('path')

const app = express()

app.disable('x-powered-by')
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(helmet({ frameguard: { action: 'deny' } }))
app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"] } }))
// app.use('/images', express.static(join(__dirname, '../uploads')))
app.use('/uploads', express.static(join(__dirname, '../uploads')))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
  res.header('Access-Control-Expose-Headers', 'Content-Length')
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
  if (req.method === 'OPTIONS') {
    return res.send(200)
  } else {
    return next()
  }
})
app.use('/api/', Router)
app.use(function (req, res, next) {
  throw new AppError(`Resource not found : ${req.originalUrl}`, httpStatus.NOT_FOUND)
})

app.use(errorHandler)

export { app }
