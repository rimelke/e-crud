import { File } from '@providers/FileProvider'
import FakeFileProvider from '@tests/providers/FakeFileProvider'
import MemoryProductRepository from '@tests/repositories/MemoryProductRepository'
import CreateProduct from '@useCases/CreateProduct'

test('should create a product', async () => {
  const productRepository = new MemoryProductRepository()
  const fileProvider = new FakeFileProvider()

  const createProduct = new CreateProduct(productRepository, fileProvider)

  const product = await createProduct.execute('1', {
    description: 'description1',
    images: [
      new File({
        name: 'productImage',
        content: 'test',
        extension: '.jpg',
        size: 100,
        type: 'image'
      }),
      new File({
        name: 'productImage',
        content: 'test',
        extension: '.jpg',
        size: 100,
        type: 'image'
      })
    ],
    name: 'product1',
    price: 10,
    publishedAt: new Date()
  })

  expect(product).toHaveProperty('id')
  expect(product.imageUrls.length).toBe(2)
  expect(fileProvider.count.save).toBe(1)
  expect(fileProvider.savedFilesCount).toBe(2)
})
