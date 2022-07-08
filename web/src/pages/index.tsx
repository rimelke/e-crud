import Title from '../components/Title'
import useGet from '../hooks/useGet'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Modal from '../components/Modal'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../components/Input'
import Button from '../components/Button'
import NumberInput from '../components/NumberInput'
import Textarea from '../components/Textarea'
import ImagesInput from '../components/ImagesInput'
import useRequest from '../hooks/useRequest'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface Product {
  id: string
  name: string
  description: string
  imageUrls: string[]
  price: number
  publishedAt: string
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    price: yup.string().required('Price is required'),
    images: yup.array().when('imageUrls', {
      is: undefined,
      then: yup
        .array()
        .min(1, 'Images must have at least 1 image')
        .required('Images are requires'),
      otherwise: yup.array()
    }),
    publishedAt: yup.string().required('Publish date is required')
  })
  .required()

interface CreateModalProps {
  isOpen: boolean
  onClose: () => void
  addProduct: (prodcut: Product) => void
}

const CreateModal = ({ isOpen, onClose, addProduct }: CreateModalProps) => {
  const { isLoading, handleRequest } = useRequest('/products')

  const form = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) =>
      value instanceof Array
        ? value.forEach((v) => formData.append(key, v))
        : formData.append(key, value as any)
    )

    const result = await handleRequest(formData)

    if (!result) return

    addProduct(result)
    onClose()
    form.reset()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a product">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2">
          <Input label="Name" name="name" autoComplete="off" />
          <Textarea name="description" label="Description" />
          <NumberInput name="price" label="Price" autoComplete="off" />
          <Input type="date" name="publishedAt" label="Publish date" />
          <ImagesInput />
          <Button isLoading={isLoading} className="mt-2 self-center">
            Create
          </Button>
        </form>
      </FormProvider>
    </Modal>
  )
}

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  product?: Product
  setData: Dispatch<SetStateAction<Product[]>>
}

const DeleteModal = ({
  isOpen,
  onClose,
  product,
  setData
}: DeleteModalProps) => {
  const { handleRequest, isLoading } = useRequest(
    `/products/${product?.id}`,
    'delete'
  )

  const handleDelete = async () => {
    const result = await handleRequest()

    if (!result) return

    setData((prevData) => prevData.filter((p) => p.id !== product.id))
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Delete - ${product?.name}?`}>
      <div className="flex gap-4 mt-2 justify-center">
        <Button onClick={onClose}>Cancel</Button>
        <Button isLoading={isLoading} onClick={handleDelete} colorSchema="red">
          Delete
        </Button>
      </div>
    </Modal>
  )
}

interface ViewModalProps {
  isOpen: boolean
  onClose: () => void
  product?: Product
  setData: Dispatch<SetStateAction<Product[]>>
}

const ViewModal = ({ isOpen, onClose, product, setData }: ViewModalProps) => {
  const form = useForm({
    resolver: yupResolver(schema)
  })
  const { handleRequest, isLoading } = useRequest(
    `/products/${product?.id}`,
    'patch'
  )
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)

  useEffect(() => {
    form.reset(product)
  }, [product])

  const onSubmit = async (data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) =>
      value instanceof Array
        ? value.forEach((v) => formData.append(key, v))
        : formData.append(key, value as any)
    )

    const result = await handleRequest(formData)

    if (!result) return

    setData((prevData) => {
      const index = prevData.findIndex((p) => p.id === product.id)

      prevData[index] = result

      return prevData
    })
    onClose()
  }

  return (
    <>
      <DeleteModal
        isOpen={deleteIsOpen}
        onClose={() => setDeleteIsOpen(false)}
        product={product}
        setData={setData}
      />
      <Modal isOpen={isOpen} onClose={onClose} title={product?.name}>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2">
            <Input label="Name" name="name" autoComplete="off" />
            <Textarea name="description" label="Description" />
            <NumberInput name="price" label="Price" autoComplete="off" />
            <Input type="date" name="publishedAt" label="Publish date" />
            <ImagesInput defaultImages={product?.imageUrls} />

            <div className="flex gap-4 mt-2 justify-center">
              <Button
                onClick={() => {
                  onClose()
                  setDeleteIsOpen(true)
                }}
                colorSchema="red">
                Delete
              </Button>
              <Button isLoading={isLoading}>Save</Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  )
}

const Home = () => {
  const { data, setData } = useGet<Product[]>('/products')
  const [createIsOpen, setCreateIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product>()

  return (
    <div className="p-8">
      <Title>Your products</Title>
      <CreateModal
        isOpen={createIsOpen}
        onClose={() => setCreateIsOpen(false)}
        addProduct={(product) => setData((prevData) => [product, ...prevData])}
      />
      <ViewModal
        isOpen={viewIsOpen}
        onClose={() => setViewIsOpen(false)}
        product={selectedProduct}
        setData={setData}
      />
      <ul className="flex flex-wrap mt-8 gap-8">
        <li
          onClick={() => setCreateIsOpen(true)}
          className="bg-slate-50 border border-dashed w-44 rounded-lg border-slate-200 flex items-center justify-center hover:bg-slate-100 cursor-pointer transition">
          <span className="text-4xl text-slate-400">+</span>
        </li>
        {data?.map((product) => (
          <li
            className="border w-44 overflow-hidden rounded-lg border-slate-200 flex flex-col"
            onClick={() => {
              setSelectedProduct(product)
              setViewIsOpen(true)
            }}
            key={product.id}>
            <img className="h-40 object-cover" src={product.imageUrls[0]} />
            <div className="flex flex-col p-2">
              <span className="text-indigo-500 font-medium text-xl">
                {product.name}
              </span>
              <span>
                {product.price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
