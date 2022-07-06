import FileProvider, { File } from '@providers/FileProvider'
import ProductRepository from '@repositories/ProductRepository'
import ArrayValidator from '@validators/ArrayValidator'
import ObjectValidator from '@validators/ObjectValidator'
import StringValidator from '@validators/StringValidator'

interface UpdateProductDTO {
  name?: string
  description?: string
  price?: number
  publishedAt?: Date
  images?: File[]
  imageUrls?: string[]
}

class UpdateProduct {
  constructor(
    private productRepository: ProductRepository,
    private fileProvider: FileProvider
  ) {}

  async execute(id: string, data: UpdateProductDTO) {
    new ObjectValidator()
      .match({
        images: new ArrayValidator().items(
          new ObjectValidator().instance(File).required()
        ),
        imageUrls: new ArrayValidator().items(
          new StringValidator().url().required()
        )
      })
      .required()
      .validate(data)

    const { images, ...value } = data

    const product = await this.productRepository.findById(id)

    if (!product) throw new Error('product not found')

    const usedImageUrls = product.imageUrls.filter(
      (imageUrl) => value.imageUrls?.includes(imageUrl) ?? true
    )

    const imageUrls = [
      ...usedImageUrls,
      ...(images ? await this.fileProvider.save(images) : [])
    ]

    const updatedProduct = await this.productRepository.update(id, {
      ...value,
      imageUrls
    })

    return updatedProduct
  }
}

export default UpdateProduct
