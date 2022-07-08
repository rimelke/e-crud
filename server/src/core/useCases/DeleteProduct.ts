import FileProvider from '@providers/FileProvider'
import ProductRepository from '@repositories/ProductRepository'
import StringValidator from '@validators/StringValidator'

class DeleteProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string, userId: string) {
    new StringValidator().required().validate(id)

    const product = await this.productRepository.findById(id)

    if (!product) return

    if (product.userId !== userId) throw new Error('product is not yours')

    const deletedProduct = await this.productRepository.softDelete(id)

    return deletedProduct
  }
}

export default DeleteProduct
