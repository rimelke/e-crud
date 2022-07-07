import nanoid from '@lib/nanoid'
import FileProvider, { File } from '@providers/FileProvider'
import fs from 'fs'
import path from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

const asyncPipe = promisify(pipeline)

class LocalFileProvider implements FileProvider {
  async save(files: File[]) {
    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const fileName = `${new Date()
            .toISOString()
            .replace(/\D/g, '')}_${nanoid(15)}.${file.extension}`

          const writable = fs.createWriteStream(
            path.resolve(
              __dirname,
              '..',
              '..',
              '..',
              'temp',
              'uploads',
              fileName
            )
          )

          await asyncPipe(file.content, writable)

          return `http://localhost:3333/uploads/${fileName}`
        })
      )

      return urls
    } catch (err) {
      files.forEach((file) => file.content.resume())
      throw err
    }
  }
}

export default LocalFileProvider
