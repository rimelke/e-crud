import Product from '@entities/Product'
import MemoryProductRepository from '@tests/repositories/MemoryProductRepository'
import GetProductsByUser from '@useCases/GetProductsByUser'

test('should get products by user', async () => {
  const productRepository = new MemoryProductRepository()

  const getProductsByUser = new GetProductsByUser(productRepository)

  productRepository.products = [
    new Product({
      id: '1',
      description: 'description1',
      name: 'product1',
      imageUrls: ['https://picsum.photos/200'],
      price: 10,
      publishedAt: new Date(),
      userId: '1'
    }),
    new Product({
      id: '2',
      description: 'description2',
      name: 'product2',
      imageUrls: ['https://picsum.photos/200'],
      price: 10,
      publishedAt: new Date(),
      userId: '2'
    })
  ]

  const products = await getProductsByUser.execute('1')

  expect(products.length).toBe(1)
  expect(products[0].userId).toBe('1')
})
