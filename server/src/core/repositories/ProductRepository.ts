import Product from '@entities/Product'

export interface CreateProductDTO {
  name: string
  description: string
  price: number
  publishedAt: Date
  imageUrls: string[]
  userId: string
}

export type UpdateProductDTO = Partial<CreateProductDTO>

interface ProductRepository {
  findById(id: string): Promise<Product | undefined>
  findByUserId(userId: string): Promise<Product[]>
  create(data: CreateProductDTO): Promise<Product>
  update(id: string, data: UpdateProductDTO): Promise<Product>
  softDelete(id: string): Promise<Product | undefined>
}

export default ProductRepository
