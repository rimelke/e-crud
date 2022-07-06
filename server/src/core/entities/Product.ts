import User from './User'

interface ProductDTO {
  id: string
  name: string
  description: string
  price: number
  publishedAt: Date
  imageUrls: string[]
  userId: string
}

class Product {
  id: string
  name: string
  description: string
  price: number
  publishedAt: Date
  imageUrls: string[]
  userId: string

  constructor(data: ProductDTO) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.price = data.price
    this.publishedAt = data.publishedAt
    this.imageUrls = data.imageUrls
    this.userId = data.userId
  }
}

export default Product
