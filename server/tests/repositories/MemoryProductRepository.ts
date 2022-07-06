import Product from '@entities/Product'
import ProductRepository from '@repositories/ProductRepository'

class MemoryProductRepository implements ProductRepository {
  products: Product[] = []

  async findByUserId(userId: string) {
    return this.products.filter((product) => product.userId === userId)
  }
}

export default MemoryProductRepository
