import ProductRepository from '@repositories/ProductRepository'
import StringValidator from '@validators/StringValidator'

class GetProductsByUser {
  constructor(private productRepository: ProductRepository) {}

  async execute(userId: string) {
    new StringValidator().required().validate(userId)

    return this.productRepository.findByUserId(userId)
  }
}

export default GetProductsByUser
