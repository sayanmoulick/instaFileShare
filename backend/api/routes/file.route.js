import express from 'express'
import { asyncMiddleware } from '../lib/asyncmiddleware'
import { fileController } from '../controllers/file.controller'

const fileRouter = express.Router()

fileRouter.post('/parent', asyncMiddleware(fileController.getDirectoryList))
fileRouter.post('/child', asyncMiddleware(fileController.getFilesList))

export { fileRouter }
