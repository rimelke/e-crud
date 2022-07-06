import ProductRepository from '@repositories/ProductRepository'

class GetProductsByUser {
  constructor(private productRepository: ProductRepository) {}

  async execute(userId: string) {
    return this.productRepository.findByUserId(userId)
  }
}

export default GetProductsByUser
