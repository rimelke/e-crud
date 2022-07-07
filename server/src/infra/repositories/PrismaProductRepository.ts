import Product from '@entities/Product'
import nanoid from '@lib/nanoid'
import prisma from '@lib/prisma'
import ProductRepository, {
  CreateProductDTO,
  UpdateProductDTO
} from '@repositories/ProductRepository'

class PrismaProductRepository implements ProductRepository {
  async findById(id: string) {
    const savedProduct = await prisma.products.findUnique({
      where: { id },
      include: { images: true }
    })

    if (!savedProduct) return

    const product = new Product({
      ...savedProduct,
      imageUrls: savedProduct.images.map((image) => image.url)
    })

    return product
  }

  async findByUserId(userId: string) {
    const savedProducts = await prisma.products.findMany({
      where: { userId },
      include: {
        images: true
      }
    })

    return savedProducts.map(
      (product) =>
        new Product({
          ...product,
          imageUrls: product.images.map((image) => image.url)
        })
    )
  }

  async create(data: CreateProductDTO) {
    const product = new Product({
      ...data,
      id: nanoid()
    })

    await prisma.products.create({
      data: {
        description: product.description,
        id: product.id,
        name: product.name,
        price: product.price,
        userId: product.userId,
        publishedAt: product.publishedAt,
        images: {
          createMany: {
            data: product.imageUrls.map((url) => ({ url }))
          }
        }
      }
    })

    return product
  }

  async update(id: string, { imageUrls, ...data }: UpdateProductDTO) {
    const savedProduct = await prisma.products.findUniqueOrThrow({
      where: { id },
      include: { images: true }
    })

    const updatedProduct = new Product({
      ...savedProduct,
      imageUrls: imageUrls || savedProduct.images.map(({ url }) => url),
      ...data
    })

    await prisma.products.update({
      where: { id },
      data: {
        description: updatedProduct.description,
        name: updatedProduct.name,
        price: updatedProduct.price,
        userId: updatedProduct.userId,
        publishedAt: updatedProduct.publishedAt,
        images: imageUrls && {
          deleteMany: {
            url: {
              notIn: imageUrls
            }
          },
          createMany: {
            skipDuplicates: true,
            data: imageUrls.map((url) => ({ url }))
          }
        }
      },
      include: {
        images: true
      }
    })

    return updatedProduct
  }

  async softDelete(id: string) {
    const savedProduct = await prisma.products.findUnique({
      where: { id },
      include: { images: true }
    })

    if (!savedProduct) return

    const now = new Date()

    await prisma.$transaction([
      prisma.products.delete({ where: { id } }),
      prisma.deletedProducts.create({
        data: {
          ...savedProduct,
          images: { connect: savedProduct.images.map(({ url }) => ({ url })) },
          deletedAt: now
        }
      }),
      prisma.productImages.updateMany({
        where: { productId: id },
        data: { deletedProductId: id, productId: null }
      })
    ])

    const product = new Product({
      ...savedProduct,
      imageUrls: savedProduct.images.map(({ url }) => url)
    })

    product.deletedAt = now

    return product
  }
}

export default PrismaProductRepository
