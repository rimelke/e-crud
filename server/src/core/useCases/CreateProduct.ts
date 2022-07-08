import FileProvider, { File } from '@providers/FileProvider'
import ProductRepository from '@repositories/ProductRepository'
import ArrayValidator from '@validators/ArrayValidator'
import ObjectValidator from '@validators/ObjectValidator'

interface CreateProductDTO {
  name: string
  description: string
  price: number
  publishedAt: Date
  images: File[]
}

class CreateProduct {
  constructor(
    private productRepository: ProductRepository,
    private fileProvider: FileProvider
  ) {}

  async execute(userId: string, data: CreateProductDTO) {
    new ObjectValidator()
      .match({
        images: new ArrayValidator()
          .items(new ObjectValidator().instance(File).required())
          .min(1)
          .required()
      })
      .required()
      .validate(data)

    const { images, ...value } = data

    console.log('imagesss', images)

    const imageUrls = await this.fileProvider.save(data.images)

    console.log(imageUrls)

    const product = await this.productRepository.create({
      ...value,
      imageUrls,
      userId
    })

    return product
  }
}

export default CreateProduct
