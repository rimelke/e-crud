import Product from '@entities/Product'
import { File } from '@providers/FileProvider'
import FakeFileProvider from '@tests/providers/FakeFileProvider'
import MemoryProductRepository from '@tests/repositories/MemoryProductRepository'
import UpdateProduct from '@useCases/UpdateProduct'
import { Readable } from 'stream'

const makeSut = () => {
  const productRepository = new MemoryProductRepository()
  const fileProvider = new FakeFileProvider()

  const updateProduct = new UpdateProduct(productRepository, fileProvider)

  productRepository.products.push(
    new Product({
      id: '1',
      description: 'description1',
      name: 'product1',
      imageUrls: ['https://picsum.photos/400'],
      price: 10,
      publishedAt: new Date(),
      userId: '1'
    })
  )

  return { productRepository, fileProvider, updateProduct }
}

const data = {
  name: 'newName',
  images: [
    new File({
      name: 'productImage',
      content: new Readable(),
      extension: '.jpg',

      type: 'image'
    })
  ],
  imageUrls: ['https://picsum.photos/400']
}

test('should update a product', async () => {
  const { updateProduct, fileProvider } = makeSut()

  const result = await updateProduct.execute('1', data)

  expect(result.name).toBe(data.name)
  expect(result.imageUrls.length).toBe(2)
  expect(fileProvider.count.save).toBe(1)
  expect(fileProvider.savedFilesCount).toBe(1)
})

test('should use all previous imageUrls if it is not defined in update data', async () => {
  const { updateProduct } = makeSut()

  const result = await updateProduct.execute('1', {
    images: data.images
  })

  expect(result.imageUrls.length).toBe(2)
})

test('should not add new images if it is not defined in update data', async () => {
  const { updateProduct, fileProvider } = makeSut()

  const result = await updateProduct.execute('1', {})

  expect(result.imageUrls.length).toBe(1)
  expect(fileProvider.count.save).toBe(0)
})

test('should not update if product do not exists', async () => {
  const { updateProduct } = makeSut()

  await expect(updateProduct.execute('2', data)).rejects.toThrow(
    'product not found'
  )
})
