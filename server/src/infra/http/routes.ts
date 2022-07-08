import UserController from '@controllers/UserController'
import { Router } from 'express'
import ExpressAdapter from '@adapters/ExpressAdapter'
import ProductController from '@controllers/ProductController'
import BusboyMiddleware from './middlewares/BusboyMiddleware'

const routes = Router()

routes.post('/users', ExpressAdapter.adapt(UserController.createUser))
routes.post('/users/login', ExpressAdapter.adapt(UserController.loginUser))
routes.patch(
  '/users/activate',
  ExpressAdapter.adapt(UserController.activateUser)
)

routes.get(
  '/products',
  ExpressAdapter.adapt(ProductController.getProductsByUser)
)
routes.post(
  '/products',
  BusboyMiddleware.handle(['images']),
  ExpressAdapter.adapt(ProductController.createProduct)
)
routes.patch(
  '/products/:id',
  BusboyMiddleware.handle(['images', 'imageUrls']),
  ExpressAdapter.adapt(ProductController.updateProduct)
)
routes.delete(
  '/products/:id',
  ExpressAdapter.adapt(ProductController.deleteProduct)
)

export default routes
