import dotenv from 'dotenv'
const result = dotenv.config({ silent: process.env.NODE_ENV === 'production' })

if (result.error) {
  throw result.error
}

// eslint-disable-next-line import/first
import util from 'util'

const applicationEnvVars = ['ALLOW_CORS_ORIGIN', 'PORT', 'API_BASE_URL']
const unusedEnvVars = applicationEnvVars.filter((i) => !process.env[i])

if (unusedEnvVars.length) throw new Error('Required ENV variables are not set: [' + unusedEnvVars.join(', ') + ']')

// eslint-disable-next-line import/first
import { app } from './api/index'

const log = util.debuglog('app')

app.listen(process.env.PORT, () => log(`App started on port ${process.env.PORT}`))

export default app
