import Controller from '@controllers/Controller'
import { Request, Response } from 'express'

class ExpressAdapter {
  static adapt(fn: Controller) {
    const handler = async (req: Request, res: Response) => {
      try {
        const result = await fn({
          authorization: req.headers.authorization,
          body: req.body,
          params: req.params
        })

        res.json(result)
      } catch (err: any) {
        console.log(err)
        res.status(400).json({ message: err?.message || 'unexpected error' })
      }
    }

    return handler
  }
}

export default ExpressAdapter
