import FileProvider from '@providers/FileProvider'
import ProductRepository from '@repositories/ProductRepository'
import StringValidator from '@validators/StringValidator'

class DeleteProduct {
  constructor(
    private productRepository: ProductRepository,
    private fileProvider: FileProvider
  ) {}

  async execute(id: string) {
    new StringValidator().required().validate(id)

    const product = await this.productRepository.softDelete(id)

    if (!product) return

    await this.fileProvider.delete(product.imageUrls)

    return product
  }
}

export default DeleteProduct
