-- CreateTable
CREATE TABLE "products" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "price" REAL NOT NULL,
    "publishedAt" DATE NOT NULL,
    "userId" VARCHAR NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productImages" (
    "url" VARCHAR NOT NULL,
    "productId" VARCHAR,
    "deletedProductId" VARCHAR,

    CONSTRAINT "productImages_pkey" PRIMARY KEY ("url")
);

-- CreateTable
CREATE TABLE "deletedProducts" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "price" REAL NOT NULL,
    "publishedAt" DATE NOT NULL,
    "userId" VARCHAR NOT NULL,
    "deletedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "deletedProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_deletedProductId_fkey" FOREIGN KEY ("deletedProductId") REFERENCES "deletedProducts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deletedProducts" ADD CONSTRAINT "deletedProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
