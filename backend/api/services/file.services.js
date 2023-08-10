const { statSync } = require('fs')
const { readdir } = require('fs').promises

exports.getFiles = async (id, dirName) => {
  const files = []

  const items = await readdir(dirName)

  for (const item of items) {
    if (!statSync(`${dirName}/${item}`).isDirectory()) {
      files.push({ _id: id, value: `${process.env.API_BASE_URL}/${dirName}/${item}` })
    }
  }

  return files
}
