import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Input from '../components/Input'
import Link from '../components/Link'
import Title from '../components/Title'
import * as yup from 'yup'
import useRequest from '../hooks/useRequest'
import { toast } from 'react-toastify'

const schema = yup
  .object()
  .shape({
    firstName: yup.string().trim().required('First name is required'),
    lastName: yup.string().trim().required('Last name is required'),
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must have at least 8 characters')
      .required('Password is required'),
    repeatPassword: yup
      .string()
      .equals([yup.ref('password')], 'Passwords must be the same')
      .required('Repeat password is required')
  })
  .required()

const Register = () => {
  const form = useForm({
    resolver: yupResolver(schema)
  })
  const { isLoading, handleRequest } = useRequest('/users')

  const onSubmit = async ({ repeatPassword: _, ...data }) => {
    const result = await handleRequest(data)

    if (!result) return

    toast.success('Success! An activation email have been sent to you.', {
      autoClose: 10 * 1000
    })
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6">
          <Title>Create your account</Title>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <Input label="First Name" name="firstName" />
              <Input label="Last Name" name="lastName" />
            </div>
            <Input label="Email" name="email" />
            <div className="flex gap-4">
              <Input type="password" label="Password" name="password" />
              <Input
                type="password"
                label="Repeat Password"
                name="repeatPassword"
              />
            </div>
          </div>
          <Link href="/login">I have an account</Link>
          <Button isLoading={isLoading} type="submit" className=" self-center">
            Sign Up
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default Register
