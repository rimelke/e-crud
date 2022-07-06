import Product from '@entities/Product'
import ProductRepository, {
  CreateProductDTO,
  UpdateProductDTO
} from '@repositories/ProductRepository'

class MemoryProductRepository implements ProductRepository {
  products: Product[] = []
  private lastId = 0

  async findById(id: string) {
    return this.products.find((product) => product.id === id)
  }

  async findByUserId(userId: string) {
    return this.products.filter((product) => product.userId === userId)
  }

  async create(data: CreateProductDTO) {
    const product = new Product({ ...data, id: (++this.lastId).toString() })

    this.products.push(product)

    return product
  }

  async update(id: string, data: UpdateProductDTO) {
    const productIndex = this.products.findIndex((product) => product.id === id)

    const updatedProduct = new Product({
      ...this.products[productIndex],
      ...data
    })

    this.products.splice(productIndex, 1, updatedProduct)

    return updatedProduct
  }
}

export default MemoryProductRepository
