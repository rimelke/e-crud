import Product from '@entities/Product'

export interface CreateProductDTO {
  name: string
  description: string
  price: number
  publishedAt: Date
  imageUrls: string[]
  userId: string
}

interface ProductRepository {
  findByUserId(userId: string): Promise<Product[]>
  create(data: CreateProductDTO): Promise<Product>
}

export default ProductRepository
