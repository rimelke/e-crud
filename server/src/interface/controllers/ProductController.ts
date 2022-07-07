import JwtAuthTokenProvider from '@infra/providers/JwtAuthTokenProvider'
import LocalFileProvider from '@infra/providers/LocalFileProvider'
import PrismaProductRepository from '@infra/repositories/PrismaProductRepository'
import CreateProduct from '@useCases/CreateProduct'
import GetProductsByUser from '@useCases/GetProductsByUser'
import UpdateProduct from '@useCases/UpdateProduct'
import ValidateAuthToken from '@useCases/ValidateAuthToken'
import Controller from './Controller'

class ProductController {
  static createProduct: Controller = async ({ body, authorization }) => {
    const authTokenProvider = new JwtAuthTokenProvider()

    const validateAuthToken = new ValidateAuthToken(authTokenProvider)

    const { userId } = await validateAuthToken.execute(authorization)

    const productRepository = new PrismaProductRepository()
    const fileProvider = new LocalFileProvider()

    const createProduct = new CreateProduct(productRepository, fileProvider)

    const product = await createProduct.execute(userId, body)

    return product
  }

  static getProductsByUser: Controller = async ({ authorization }) => {
    const authTokenProvider = new JwtAuthTokenProvider()

    const validateAuthToken = new ValidateAuthToken(authTokenProvider)

    const { userId } = await validateAuthToken.execute(authorization)

    const productRepository = new PrismaProductRepository()

    const getProductsByUser = new GetProductsByUser(productRepository)

    const products = await getProductsByUser.execute(userId)

    return products
  }

  static updateProduct: Controller = async ({
    params,
    body,
    authorization
  }) => {
    const authTokenProvider = new JwtAuthTokenProvider()

    const validateAuthToken = new ValidateAuthToken(authTokenProvider)

    const { userId } = await validateAuthToken.execute(authorization)

    const productRepository = new PrismaProductRepository()
    const fileProvider = new LocalFileProvider()

    const updateProduct = new UpdateProduct(productRepository, fileProvider)

    const result = await updateProduct.execute(params.id, body)

    return result
  }
}

export default ProductController
