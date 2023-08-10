import { getFiles } from '../services/file.services'

const { readdir } = require('fs').promises

const fileController = {}

fileController.getDirectoryList = async (req, res) => {
  const { dirName = 'uploads' } = req.body

  const directories = await readdir(dirName)

  return res.json({ message: 'Ok', data: directories })
}

fileController.getFilesList = async (req, res) => {
  try {
    const { dirName = 'uploads' } = req.body

    let files = []

    const items = await readdir(dirName, { withFileTypes: true })

    let idx = 0

    for (const item of items) {
      idx++
      if (item.isDirectory()) {
        files = [
          ...files,
          ...(await getFiles(idx, `${dirName}/${item.name}`))
        ]
      } else {
        files.push({ _id: idx, value: `${process.env.API_BASE_URL}/${dirName}/${item.name}` })
      }
    }

    return res.json({ message: 'Ok', data: files })
  } catch (error) {
    return res.json({ error: error.message })
  }
}

export { fileController }
