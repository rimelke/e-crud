import Product from '@entities/Product'
import FakeFileProvider from '@tests/providers/FakeFileProvider'
import MemoryProductRepository from '@tests/repositories/MemoryProductRepository'
import DeleteProduct from '@useCases/DeleteProduct'

const makeSut = () => {
  const productRepository = new MemoryProductRepository()

  const deleteProduct = new DeleteProduct(productRepository)

  productRepository.products = [
    new Product({
      id: '1',
      description: 'description1',
      name: 'product1',
      imageUrls: ['https://picsum.photos/200', 'https://picsum.photos/200'],
      price: 10,
      publishedAt: new Date(),
      userId: '1'
    })
  ]

  return { productRepository, deleteProduct }
}

test('should delete a product', async () => {
  const { productRepository, deleteProduct } = makeSut()

  const product = await deleteProduct.execute('1', '1')

  expect(product).toBeDefined()
  expect(product?.deletedAt).toBeDefined()
  expect(productRepository.deletedProducts.length).toBe(1)
  expect(productRepository.products.length).toBe(0)
})

test('should not return nothing or delete any file if product do not exists', async () => {
  const { deleteProduct } = makeSut()

  const result = await deleteProduct.execute('2', '1')

  expect(result).not.toBeDefined()
})

test('should not delete if product is not from user', async () => {
  const { deleteProduct } = makeSut()

  await expect(deleteProduct.execute('1', '2')).rejects.toThrow(
    'product is not yours'
  )
})
