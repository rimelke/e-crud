import Product from '@entities/Product'
import ProductRepository, {
  CreateProductDTO
} from '@repositories/ProductRepository'

class MemoryProductRepository implements ProductRepository {
  products: Product[] = []
  private lastId = 0

  async findByUserId(userId: string) {
    return this.products.filter((product) => product.userId === userId)
  }

  async create(data: CreateProductDTO) {
    const product = new Product({ ...data, id: (++this.lastId).toString() })

    this.products.push(product)

    return product
  }
}

export default MemoryProductRepository
