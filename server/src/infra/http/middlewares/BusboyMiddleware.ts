import { File } from '@providers/FileProvider'
import busboy from 'busboy'
import { RequestHandler } from 'express'

class BusboyMiddleware {
  static handle(arrayFields: string[] = []) {
    const handler: RequestHandler = (req, res, next) => {
      try {
        const bb = busboy({ headers: req.headers })

        let timeout: any
        const addTimeout = () => {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            bb.removeAllListeners()
            next()
          }, 100)
        }

        const addValueToBody = (name: string, value: any) => {
          if (!req.body[name])
            req.body[name] = arrayFields.includes(name) ? [value] : value
          else if (req.body[name] instanceof Array) req.body[name].push(value)
          else req.body[name] = value

          addTimeout()
        }

        bb.on('field', addValueToBody)

        bb.on('file', (name, stream, info) =>
          addValueToBody(
            name,
            new File({
              content: stream,
              extension: info.filename.substring(
                info.filename.lastIndexOf('.') + 1
              ),
              name: info.filename,
              type: info.mimeType
            })
          )
        )

        req.pipe(bb)
        addTimeout()
      } catch (err: any) {
        res.status(400).json({ message: err.message || 'unexpected error' })
      }
    }

    return handler
  }
}

export default BusboyMiddleware
