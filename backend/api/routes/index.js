import express from 'express'
import { asyncMiddleware } from '../lib/asyncmiddleware'
import { fileRouter } from './file.route'

const Router = express.Router()

Router.get(
  '/health-check',
  asyncMiddleware((req, res) => {
    return res.json({ message: 'OK' })
  })
)

Router.use('/file', fileRouter)

export { Router }
