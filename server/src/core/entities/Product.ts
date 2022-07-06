import ArrayValidator from '@validators/ArrayValidator'
import DateValidator from '@validators/DateValidator'
import NumberValidator from '@validators/NumberValidator'
import ObjectValidator from '@validators/ObjectValidator'
import StringValidator from '@validators/StringValidator'

interface ProductDTO {
  id: string
  name: string
  description: string
  price: number
  publishedAt: Date
  imageUrls: string[]
  userId: string
}

const validator = new ObjectValidator().match({
  id: new StringValidator().required(),
  name: new StringValidator().trim().required(),
  description: new StringValidator().trim().required(),
  price: new NumberValidator().required(),
  publishedAt: new DateValidator().required(),
  imageUrls: new ArrayValidator()
    .items(new StringValidator().url().required())
    .min(1)
    .required(),
  userId: new StringValidator().required()
})

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

    this.validate()
  }

  validate() {
    validator.validate(this)
  }
}

export default Product
