import { getQueues } from '@lib/bull'
import express from 'express'
import routes from './routes'
import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import BusboyMiddleware from './middlewares/BusboyMiddleware'

const app = express()
const expressAdapter = new ExpressAdapter()

createBullBoard({
  serverAdapter: expressAdapter,
  queues: getQueues()
})

app.use(express.json())
app.use(routes)

expressAdapter.setBasePath('/admin/queues')
app.use('/admin/queues', expressAdapter.getRouter())

export default app
