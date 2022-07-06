import Product from '@entities/Product'

interface ProductRepository {
  findByUserId(userId: string): Promise<Product[]>
}

export default ProductRepository
